
function LowerCaseChange(description) {
  try {
    let nextWord = false;
    let tempDescription = description.charAt(0);
    for (let i = 1; i < description.length; i++) {
      if (description.charAt(i) === " ") {
        tempDescription = tempDescription + description.charAt(i);
        nextWord = true;
      }
      else if (nextWord === true) {
        tempDescription = tempDescription + description.charAt(i);
        nextWord = false;
      }
      else {
        tempDescription = tempDescription + description.charAt(i).toLowerCase();
      }

    }

    return tempDescription;
  }
  catch (exception) {
    console.error(exception)
  }

}
export default LowerCaseChange;