const modifier = (text) => {
  let modifiedText = text
  const rawText = text.split('\n').splice(1,1).join('') //remove the added newline from the start of the text so we can evaluate at the raw input
  if (!state.startup){
    state.prompt = ['','','','','','','','','']
    state.startup = true
    state.stopAI = true
  }
  if (/^(> You |> You say "|)(\/br|\/c|\/s[1-9] |\/l[1-9])/i.test(rawText)) { //check if input is a command
    if (state.message) {delete state.message} //clear any alert message when submitting a new command
    if (/^(> You |> You say "|)(\/c)/i.test(rawText)) { //clear alert message command
      if (state.message) {delete state.message}
      modifiedText = null
      state.stopAI = true
    }
    if (/^(> You |> You say "|)(\/br)/i.test(rawText)) {  //insert break command
      modifiedText = "\n\n[———BREAK———]"
      state.stopAI = true
    }
    if (match = rawText.match(/^(?:> You |> You say "|)\/s([1-9] )/i)) { //save prompt command
      innerText = text.slice(match[0].length+1) //get the text that comes after the command
      innerText = innerText.replace(/"\n$|\.\n$/,'') //trim the bits added to the end of the text when using Do or Say inputs
      state.message = 'Saved input to location ' + match[1]
      state.prompt[match[1]-1] = innerText
      modifiedText = null
      state.stopAI = true
    }
    if (match = rawText.match(/^(?:> You |> You say "|)\/l([1-9])/i)) { //load prompt command
      if (typeof state.prompt !== 'undefined' && state.prompt[match[1]-1] != '') {modifiedText = "\n\n" + state.prompt[match[1]-1]}
      else {
        modifiedText = null
        state.message = 'Save slot ' + match[1] + ' is empty'
        state.stopAI = true
      }
      state.stopAI = true
    }
  }
  else if (/^(> You |> You say "|)(\/)/i.test(rawText)) { //check for invalid commands and return error message if found
    state.message = 'Not a valid command'
    modifiedText = null
    state.stopAI = true
  }
  // You must return an object with the text property defined.
  return { text: modifiedText }
}

// Don't modify this part
modifier(text)
