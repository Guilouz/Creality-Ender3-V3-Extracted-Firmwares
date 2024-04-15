import math, logging
from .bed_mesh import *

class GapAutoComp:
    def __init__(self, config):
        self.printer = config.get_printer()
        self.in_home = False
        self.bed_mesh = None
        self.ofts = [0., 0., 0., 0.]
        self.is_add_dirs = [False, False, False, False]
        self.last_ofts = [0., 0., 0., 0.]
        self.show_msg = config.getboolean('show_msg', False)
        self.printer.register_event_handler("homing:home_rails_begin",self._handle_home_rails_begin)
        self.printer.register_event_handler("homing:home_rails_end", self._handle_home_rails_end)

        self.x_gaps = list(config.getfloatlist("x_gaps"))
        self.y_gaps = list(config.getfloatlist("y_gaps"))
        self.z_gaps = list(config.getfloatlist("z_gaps"))
        
        self.x_1dps = self.y_1dps = self.z_2dps = None

        self.gcode = self.printer.lookup_object('gcode')
        self.gcode.register_command('SET_GAP_AUTO_COMP', self.cmd_SET_GAP_AUTO_COMP, desc=self.cmd_SET_GAP_AUTO_COMP_help)
        pass

    def _handle_home_rails_begin(self, homing_state, rails):
        self.ofts = [0., 0., 0., 0.]
        self.is_add_dirs = [False, False, False, False]
        self.in_home = True
        toolhead = self.printer.lookup_object('toolhead')
        toolhead.gap_auto_comp = self
        self.updata_gaps()
        pass

    def _handle_home_rails_end(self, homing_state, rails):
        self.in_home = False
        pass

    def updata_gaps(self):
        bed_mesh = self.printer.lookup_object('bed_mesh')
        min_x, min_y = bed_mesh.bmc.mesh_min
        max_x, max_y = bed_mesh.bmc.mesh_max

        if len(self.x_gaps) != 1:
            self.x_1dps = []
            for i in range(len(self.x_gaps)):
                self.x_1dps.append([(max_x - min_x) * i / (len(self.x_gaps) - 1) + min_x, self.x_gaps[i]])

        if len(self.y_gaps) != 1:
            self.y_1dps = []
            for i in range(len(self.y_gaps)):
                self.y_1dps.append([(max_y - min_y) * i / (len(self.y_gaps) - 1) + min_y, self.y_gaps[i]])

        if len(self.z_gaps) == 4:
            self.z_2dps = [[min_x, min_y, self.z_gaps[0]], [max_x, min_y, self.z_gaps[1]], [min_x, max_y, self.z_gaps[2]], [max_x, max_y, self.z_gaps[3]]]

        if self.show_msg:
            self.gcode.respond_info('X_GAPS=%s' % str(self.x_gaps if not self.x_1dps else self.x_1dps))
            self.gcode.respond_info('Y_GAPS=%s' % str(self.y_gaps if not self.y_1dps else self.y_1dps))
            self.gcode.respond_info('Z_GAPS=%s' % str(self.z_gaps if not self.z_2dps else self.z_2dps))
        pass        

    def get_linear2(self, p1, p2, po, is_base_x):
        if (math.fabs(p1[0] - p2[0]) < 0.001 and is_base_x) or (math.fabs(p1[1] - p2[1]) < 0.001 and not is_base_x):
            return po
        a = (p2[2] - p1[2]) / ((p2[0] - p1[0]) if is_base_x else (p2[1] - p1[1]))
        b = p1[2] - (p1[0] if is_base_x else p1[1]) * a
        po[2] = a * (po[0] if is_base_x else po[1]) + b
        return po
    
    def get_best_rdy_z(self, rdy_x, rdy_y):
        p_left = [self.z_gaps[0][0], rdy_y, 0]
        p_right = [self.z_gaps[2][0], rdy_y, 0]
        p_mid = [rdy_x, rdy_y, 0]
        p_left = self.get_linear2(self.z_gaps[0], self.z_gaps[1], p_left, False)
        p_right = self.get_linear2(self.z_gaps[2], self.z_gaps[3], p_right, False)
        p_mid = self.get_linear2(p_left, p_right, p_mid, True)
        return p_mid[2]
    
    def deal_move(self, toolhead, now_pos, new_pos):
        if self.in_home:
            return self.ofts
        
        for i in range(3):
            if now_pos[i] != new_pos[i]:
                if self.is_add_dirs[i]:
                    now_pos[i] -= self.last_ofts[i]
                if now_pos[i] != new_pos[i]:          
                    if new_pos[i] > now_pos[i]:
                        if i == 0:
                            self.ofts[i] = self.get_x_gap(new_pos[0], new_pos[1], new_pos[2])
                        elif i == 1:
                            self.ofts[i] = self.get_y_gap(new_pos[0], new_pos[1], new_pos[2])
                        elif i == 2:
                            self.ofts[i] = self.get_z_gap(new_pos[0], new_pos[1], new_pos[2])
                    elif new_pos[i] < now_pos[i]:
                        self.ofts[i] = 0
                    self.last_ofts[i] = self.ofts[i]
                    self.is_add_dirs[i] = new_pos[i] > now_pos[i]         
        return self.ofts

    def get_x_gap(self, x, y, z):
        if self.x_1dps == None:
            return self.x_gaps[0]
        
        if x <= self.x_1dps[0][0]:
            return self.x_1dps[0][1]
        if x >= self.x_1dps[-1][0]:
            return self.x_1dps[-1][1]
        for i in range(len(self.x_1dps) - 1):
            if self.x_1dps[i][0] < x <= self.x_1dps[i + 1][0]:
                return (self.x_1dps[i+1][1] - self.x_1dps[i][1]) * (x - self.x_1dps[i][0]) / (self.x_1dps[i + 1][0] - self.x_1dps[i][0]) + self.x_1dps[i][1]
        return 0.
    
    def get_y_gap(self, x, y, z):
        if self.y_1dps == None:
            return self.y_gaps[0]
        
        if y <= self.y_1dps[0][0]:
            return self.y_1dps[0][1]
        if y >= self.y_1dps[-1][0]:
            return self.y_1dps[-1][1]
        for i in range(len(self.y_1dps) - 1):
            if self.y_1dps[i][0] < y <= self.y_1dps[i + 1][0]:
                return (self.y_1dps[i+1][1] - self.y_1dps[i][1]) * (y - self.y_1dps[i][0]) / (self.y_1dps[i + 1][0] - self.y_1dps[i][0]) + self.y_1dps[i][1]
        return 0.
    
    def get_z_gap(self, x, y, z):
        if self.z_2dps == None:
            return self.z_gaps[0]
        return self.get_best_rdy_z(x, y, )
    pass

    cmd_SET_GAP_AUTO_COMP_help = "Set the params for auto bed comp."
    def cmd_SET_GAP_AUTO_COMP(self, gcmd): 
        x_gaps = gcmd.get("X", None)
        y_gaps = gcmd.get("Y", None)
        z_gaps = gcmd.get("Z", None)
        try:
            if x_gaps:
                strs = x_gaps.strip().split(',')
                x_gaps = []
                for s in strs:
                    x_gaps.append(float(s.strip()))
                self.x_gaps = [x for x in x_gaps]
                pass

            if y_gaps:
                strs = y_gaps.strip().split(',')
                y_gaps = []
                for s in strs:
                    y_gaps.append(float(s.strip()))
                self.y_gaps = [y for y in y_gaps]
                pass

            if z_gaps:
                strs = z_gaps.strip().split(',')
                z_gaps = []
                for s in strs:
                    z_gaps.append(float(s.strip()))
                self.z_gaps = [z for z in z_gaps]
                pass   
            self.updata_gaps()
            self.gcode.respond_info('run cmd_SET_BED_AUTO_COMP success!')      
        except:
            self.gcode.respond_info('run cmd_SET_BED_AUTO_COMP Error!')  
            pass

def load_config(config):
    return GapAutoComp(config)
