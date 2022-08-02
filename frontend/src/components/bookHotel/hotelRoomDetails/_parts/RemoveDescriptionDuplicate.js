function RemoveDescriptionDuplicate(roomDescriptionArray){
    let i = 0, j = 0;
    
    while (i < roomDescriptionArray.length){
      j = i + 1;
      while (j < roomDescriptionArray.length){
        if(roomDescriptionArray[i] === roomDescriptionArray[j]){
          roomDescriptionArray.splice(j, 1);
        }
        j += 1;
      }

      

      i+=1;
    }
    i = 0;
    j = 0;
    
  
    return roomDescriptionArray;
  }


  export default RemoveDescriptionDuplicate;