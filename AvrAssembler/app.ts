
class AsmEditor
{
  element: HTMLElement;
  span: HTMLElement;

  constructor(element: HTMLElement)
  {
    this.element = element;
    this.doFormat();
  }

  doFormat()
  {
    var str = this.element.innerHTML;
    var lines = str.split("<br>");

    console.log(lines);
  }
}

var asmEditor: AsmEditor;

window.onload = () =>
{
  asmEditor = new AsmEditor(document.getElementById("line-code"));
};
