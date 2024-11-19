
const default_cow = `        $thoughts   ^__^
         $thoughts  ($eyes)\\_______
            (__)\\       )\\/\\
             $tongue ||----w |
                ||     ||`;

function cowsay(cow, say, opts) {
  const W = 40;
  // construct_balloon
  const lines = say.split('\n');
  var message = [];
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].split(' ');
    let message_line = "";
    for (let j = 0; j < line.length; j++) {
      let word = line[j];
      if (word.length >= W) {
        if (message_line.length > 0) {
          message.push(message_line);
        }
        while (word.length > W) {
          message.push(word.slice(0, W - 1) + "-");
          word = word.slice(W - 1);
        }
        message_line = word;
      }
      else if (message_line.length + word.length >= W) {
        message.push(message_line);
        message_line = word;
      }
      else if (message_line.length === 0) {
        message_line = word;
      }
      else {
        message_line = message_line + " " + word;
      }
    }
    if (message_line.length > 0) {
      message.push(message_line);
    }
  }
  const max = Math.max(...message.map(line => line.length));
  const max2 = max + 2;
  const thoughts = '\\';
  if (message.length < 2) {
    var border = ['<', '>'];
  }
  else {
    var border = ['/', '\\', '\\', '/', '|', '|'];
  }
  var balloon_lines = [];
  balloon_lines.push(
    " " + "_".repeat(max2) + " \n",
    `${border[0]} ${(message[0] + " ".repeat(max)).slice(0, max)} ${border[1]}\n`,
    ...(message.length < 2 ? [] : message.slice(1, message.length - 1).map(line => `${border[4]} ${(line + " ".repeat(max)).slice(0, max)} ${border[5]}\n`)),
    message.length < 2 ? "" : `${border[2]} ${(message[message.length - 1] + " ".repeat(max)).slice(0, max)} ${border[3]}\n`,
    " " + "-".repeat(max2) + " \n"
  );
  // construct_face
  var eyes = "oo";
  var tongue = "  ";
  if (opts.indexOf('e') !== -1) { let eidx = opts.indexOf('e'); eyes = opts.slice(eidx + 1, eidx + 3); }
  if (opts.indexOf('T') !== -1) { let Tidx = opts.indexOf('T'); tongue = opts.slice(Tidx + 1, Tidx + 3); }
  if (opts.indexOf('b') !== -1) { eyes = "=="; }
  if (opts.indexOf('d') !== -1) { eyes = "xx"; tongue = "U "; }
  if (opts.indexOf('g') !== -1) { eyes = "$$"; }
  if (opts.indexOf('p') !== -1) { eyes = "@@"; }
  if (opts.indexOf('s') !== -1) { eyes = "**"; tongue = "U "; }
  if (opts.indexOf('t') !== -1) { eyes = "--"; }
  if (opts.indexOf('w') !== -1) { eyes = "OO"; }
  if (opts.indexOf('y') !== -1) { eyes = ".."; }
  // get_cow
  var the_cow = cow.replace(/(\$thoughts)|(\$eyes)|(\$tongue)/g, match => {
    switch (match) {
      case "$thoughts":
        return thoughts;
      case "$eyes":
        return eyes;
      case "$tongue":
        return tongue;
      default:
        return "";
    }
  });
  // pad each line to equal length
  var result_lines = (balloon_lines.join('') + the_cow).split('\n');
  var result_max = Math.max(...result_lines.map(line => line.length));
  for (let i = 0; i < result_lines.length; i++) {
    result_lines[i] = (result_lines[i] + " ".repeat(result_max)).slice(0, result_max);
  }
  // return
  return result_lines.join('\n');
}