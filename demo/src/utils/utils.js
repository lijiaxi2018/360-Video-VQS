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
    
    default:
      return '#000000';
  }
}