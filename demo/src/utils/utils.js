export function categoryInt2Str(category) {
  switch(category) {
    case 1:
      return 'Firefighter'
    
    case 2:
      return 'Civilian'
    
    case 3:
      return 'Ladder'
    
    case 4:
      return 'Fire'
    
    case 5:
      return 'Window'
    
    case 6:
      return 'Oxygen Tank'
      
    case 7:
      return 'Door'
    
    case 8:
      return 'Gas Tank'
    
    case 9:
      return 'Fire Truck'
    
    case 10:
      return 'Firefighter Helmet'
    
    case 11:
      return 'Structural Damage'
    
    case 12:
      return 'Civilian Car'
    
    case 13:
      return 'Trees'
    
    case 14:
      return 'Water Hose'
    
    case 15:
      return 'Building'
    
    case 16:
      return 'Fence'
      
    case 17:
      return 'Stairs'
    
    case 18:
      return 'Water'
    
    case 19:
      return 'Firefighter Mask'
    
    case 20:
      return 'Smoke'
    
    case 21:
      return 'Breaking Door'
    
    case 22:
      return 'Climbing Ladder'
    
    case 23:
      return 'Driving'
    
    case 24:
      return 'Dressing Firefighter'
    
    case 25:
      return 'Carrying Body'
    
    default:
      return '';
  }
}

export function categoryStr2Int(category) {
  switch(category) {
    case 'Firefighter':
      return 1;
    
    case 'Civilian':
      return 2;
    
    case 'Ladder':
      return 3;
    
    case 'Fire':
      return 4;
    
    case 'Window':
      return 5;
    
    case 'Oxygen Tank':
      return 6;
      
    case 'Door':
      return 7;
    
    case 'Gas Tank':
      return 8;
    
    case 'Fire Truck':
      return 9;
    
    case 'Firefighter Helmet':
      return 10;
    
    case 'Structural Damage':
      return 11;
    
    case 'Civilian Car':
      return 12;
    
    case 'Trees':
      return 13;
    
    case 'Water Hose':
      return 14;
    
    case 'Building':
      return 15;
    
    case 'Fence':
      return 16;
      
    case 'Stairs':
      return 17;
    
    case 'Water':
      return 18;
    
    case 'Firefighter Mask':
      return 19;
    
    case 'Smoke':
      return 20;
    
    case 'Breaking Door':
      return 21;
    
    case 'Climbing Ladder':
      return 22;
    
    case 'Driving':
      return 23;
    
    case 'Dressing Firefighter':
      return 24;
    
    case 'Carrying Body':
      return 25;
    
    default:
      return '';
  }
}

export function categoryInt2Color(category) {
  switch(category) {
    case 1:
      return '#e6194B'
    
    case 2:
      return '#9A6324'
    
    case 3:
      return '#808000'
    
    case 4:
      return '#469990'
    
    case 5:
      return '#000075'
    
    case 6:
      return '#800000'
      
    case 7:
      return '#f58231'
    
    case 8:
      return '#ffe119'
    
    case 9:
      return '#bfef45'
    
    case 10:
      return '#3cb44b'
    
    case 11:
      return '#42d4f4'
    
    case 12:
      return '#4363d8'
    
    case 13:
      return '#911eb4'
    
    case 14:
      return '#f032e6'
    
    case 15:
      return '#a9a9a9'

    case 16:
      return '#fabed4'
      
    case 17:
      return '#ffd8b1'
    
    case 18:
      return '#fffac8'
    
    case 19:
      return '#aaffc3'
    
    case 20:
      return '#dcbeff'
    
    case 21:
      return '#fcff5d'
    
    case 22:
      return '#7dfc00'
    
    case 23:
      return '#8ad8e8'
    
    case 24:
      return '#3750db'
    
    case 25:
      return '#c56133'

    default:
      return '#000000';
  }
}