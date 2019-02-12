
interface Line
{
  origin: string;
  filtered: string;
}

class AsmEditor
{
  element: HTMLElement;
  span: HTMLElement;

  constructor(element: HTMLElement)
  {
    this.element = element;
    this.doFormat();
  }

  static lineSplitter(htmlCode: string): Line[]
  {
    var lines = htmlCode.split("<br>");
    var output: Line[] = [];

    for (var i = 0; i < lines.length; i++)
    {
      var o = <Line>{ origin: lines[i] };
      o.filtered = $.trim(o.origin).replace("&nbsp;", " ");
      output[i] = o;
    }

    return output;
  }

  doFormat()
  {
    var lines = AsmEditor.lineSplitter(this.element.innerHTML);

    console.log(lines);
  }
}

var asmEditor: AsmEditor;

window.onload = () =>
{
  asmEditor = new AsmEditor(document.getElementById("line-code"));
};
