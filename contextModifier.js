const modifier = (text) => {
  const contextMemory = info.memoryLength ? text.slice(0, info.memoryLength) : ''
  const context = info.memoryLength ? text.slice(info.memoryLength) : text
  const lines = context.split("\n")

  if(state.stopAI){
    state.stopAI = false
    stop = true; return { stop }
  }
  for (i = 0; i < lines.length; i++){ //find the lastest instance of the break instruction
    if (/\[\—\—\—BREAK\—\—\—\]/.test(lines[i])){
      j = i
    }
  }
  if (typeof j !== 'undefined'){ //if a break instruction exists remove all text before and including the break from context
    var trimmed = lines.slice(j+1)
    var output = trimmed.join("\n").slice(-(info.maxChars - info.memoryLength))
  }
  if (typeof trimmed === 'undefined'){ //if no break instruction is found leave the text as is
    var output = lines.join("\n").slice(-(info.maxChars - info.memoryLength))
  }
  // Make sure the new context isn't too long, or it will get truncated by the server.
  const combinedLines = output
  const finalText = [contextMemory, combinedLines].join("")
  return { text: finalText }
}

// Don't modify this part
modifier(text)
