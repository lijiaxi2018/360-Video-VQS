import json
import math
import numpy as np
import os
import sys

FPS = 30
WIDTH = 960
HEIGHT = 480
TXT_ENDINGS = (".txt")
def getAllTexts(path):
    texts_filenames = []
    for f in os.listdir(path):
        if any(f.endswith(ending) for ending in TXT_ENDINGS):
            texts_filenames.append(f)
    return texts_filenames

# def frames_to_timestamps(frames, tps=5):
#     timestamps = set()
#     for f in frames:
#         timestamps.add(round( math.floor( f / (FPS / tps) ) * (1 / tps), 2 ))
    
#     return sorted(list(timestamps))

def record_frame(bb_data, index, file_path):
    f = open(file_path, "r")
    lines = f.readlines()
    bb_lines = []
    for line in lines:
        line = line[0:len(line)-1]
        splitted = line.split(' ')

        type_num = int(splitted[0])
        x = float(splitted[1])
        y = float(splitted[2])
        w = float(splitted[3])
        h = float(splitted[4])

        x_ = (x - 0.5 * w) * WIDTH
        y_ = (y - 0.5 * h) * HEIGHT
        w_ = w * WIDTH
        h_ = h * HEIGHT

        bb_lines.append([type_num, x_, y_, w_, h_])
        
    bb_data[index] = bb_lines

def main():
    args = sys.argv

    input_folder_name = args[1]
    input_texts = getAllTexts(input_folder_name)

    bb_data = {}
    for i in range(len(input_texts)):
        record_frame(bb_data, i, input_folder_name + '/' + input_texts[i])
    
    bb_data['num_frames'] = len(input_texts)
    
    with open(input_folder_name + '_' + "bb_data.json", "w") as outfile:
        json.dump(bb_data, outfile)
    
    

if __name__ == "__main__":
    main()