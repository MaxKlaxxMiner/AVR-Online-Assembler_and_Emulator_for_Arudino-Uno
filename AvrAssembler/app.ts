class Greeter
{
  element: HTMLElement;
  span: HTMLElement;
  timerToken: number;

  constructor(element: HTMLElement)
  {
    this.element = element;
    this.update();
  }

  update()
  {
    //this.element.innerHTML = "";
  }

  start()
  {
    this.timerToken = setInterval(() => this.update(), 500);
  }

  stop()
  {
    clearTimeout(this.timerToken);
  }

}

window.onload = () =>
{
  var el = document.getElementById("line-codes");
  var greeter = new Greeter(el);
  greeter.start();
};
