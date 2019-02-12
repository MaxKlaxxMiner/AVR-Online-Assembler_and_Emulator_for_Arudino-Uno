
interface CodeElement
{
  /**
   * Typ des Code-Elementes
   * 0: undefined
   * 1: Line-Comment
   */
  t: number;

  /** Startposition in der Zeichenkette */
  p: number;

  /** Anzahl der betroffenen Zeichen in der Zeichenkette */
  c: number;
}

interface CodeLine
{
  /** originale Zeichenkette */
  origin: string;

  /** gefilterte Zeichenkette */
  filtered: string;

  /** erkannte Code-Elemente in der Zeichenkette */
  code: CodeElement[];

  /** Ergebnis als HTML-Ausgabe */
  result: string;
}

class AsmEditor
{
  element: HTMLElement;
  span: HTMLElement;

  /**
   * Konstruktor des Assembler-Editors
   * @param element HTML-Element als Textbox, welche bearbeitbar ist
   */
  constructor(element: HTMLElement)
  {
    this.element = element;
    this.doFormat();
  }

  /**
   * parst eine Zeile und markiert die erkannten Code-Elemente
   * @param line Zeile, welche geparst werden soll
   */
  static codeParser(line: CodeLine)
  {
    var elements = <CodeElement[]>[];
    var str = line.filtered;
    for (var i = 0; i < str.length; i++)
    {
      if (str[i] === " ") continue;
      if (str[i] === ";" || (str[i] === "/" && str[i + 1] === "/"))
      {
        elements.push(<CodeElement>{ t: 1, p: i, c: str.length - i });
        break;
      }
    }
    line.code = elements;
  }

  /**
   * formatiert den Code mit Syntax-Highlighting und gibt den fertigen HTML-Code im result-Element zurück
   * @param line Zeile, welche verarbeitet werden soll
   */
  static codeHighlighter(line: CodeLine)
  {
    var r = line.filtered;
    for (var i = line.code.length - 1; i >= 0; i--) // Code-Element rückwärts abarbeiten
    {
      var c = line.code[i];
      var hl = "";
      switch (c.t)
      {
        case 1: hl = "cc"; break;
      }
      if (hl !== "")
      {
        r = [r.slice(0, c.p), "<", hl, ">", r.slice(c.p, c.p + c.c), "</", hl, ">", r.slice(c.p + c.c)].join("");
      }
    }
    line.result = r.replace(/  /g, "&nbsp; ").replace(/  /g, " &nbsp;").replace(/ </g, "&nbsp;<");
  }

  static lineSplitter(htmlCode: string): CodeLine[]
  {
    console.log(htmlCode);
    var lines = htmlCode
      .replace(/<div><br><\/div>/gi, "<div></div>")
      .replace(/<div>/gi, "")
      .replace(/<\/div>/gi, "<br>")
      .replace(/<br>/gi, "<br>")
      .replace(/<br\/>/gi, "<br>")
      .replace(/<br \/>/gi, "<br>")
      .split("<br>");
    var output: CodeLine[] = [];

    for (var i = 0; i < lines.length; i++)
    {
      var o = <CodeLine>{ origin: lines[i] };
      o.filtered = $.trim(o.origin).replace(/&nbsp;/g, " ").replace(/<(?:.|\n)*?>/gm, "");;
      AsmEditor.codeParser(o);
      AsmEditor.codeHighlighter(o);
      output[i] = o;
    }

    return output;
  }

  doFormat()
  {
    var lines = AsmEditor.lineSplitter(this.element.innerHTML);

    a = lines;
    console.log(lines);

    var ll = <string[]>[];
    for (var i = 0; i < lines.length; i++) ll.push(lines[i].result);

    if (/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor))
    {
      this.element.innerHTML = ("<div>" + ll.join("</div><div>") + "</div>").replace(/<div><\/div>/g, "<div><br></div>");
    }
    else
    {
      this.element.innerHTML = ll.join("<br>\n");
    }
  }
}

var asmEditor: AsmEditor;
var a: any;

window.onload = () =>
{
  asmEditor = new AsmEditor(document.getElementById("editable-code"));
};
