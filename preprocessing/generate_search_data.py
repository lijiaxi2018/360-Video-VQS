import json
import math
import numpy as np
import os
import sys

FPS = 30
TXT_ENDINGS = (".txt")
def getAllTexts(path):
    texts_filenames = []
    for f in os.listdir(path):
        if any(f.endswith(ending) for ending in TXT_ENDINGS):
            texts_filenames.append(f)
    return texts_filenames

def frames_to_timestamps(frames, tps=5):
    timestamps = set()
    for f in frames:
        timestamps.add(round( math.floor( f / (FPS / tps) ) * (1 / tps), 2 ))
    
    return sorted(list(timestamps))

def record_frame(query_data, index, file_path):
    f = open(file_path, "r")
    lines = f.readlines()
    for line in lines:
        line = line[0:len(line)-1]
        splitted = line.split(' ')

        type_num = int(splitted[0])
        
        if type_num not in query_data:
            query_data[type_num] = []
        query_data[type_num].append(index)

def main():
    args = sys.argv

    input_folder_name = args[1]
    input_texts = getAllTexts(input_folder_name)

    query_data = {}
    for i in range(len(input_texts)):
        record_frame(query_data, i, input_folder_name + '/' + input_texts[i])
    
    for k in query_data.keys():
        query_data[k] = sorted(list(set(query_data[k])))
    
    for k in query_data.keys():
        query_data[k] = frames_to_timestamps(query_data[k])
    
    query_data['key'] = sorted(list(query_data.keys()))
    
    with open(input_folder_name + '_' + "search_data.json", "w") as outfile:
        json.dump(query_data, outfile)

if __name__ == "__main__":
    main()