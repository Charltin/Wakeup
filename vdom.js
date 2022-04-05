{
  /* <div id="div1" class="container">
  <p>vdom</p>
  <ul style="font-size: 20px">
    <li>a</li>
  </ul>
</div> */
}

// 用js模拟以上html片段，没有严格的标准，大概这样
{
  tag: "div"
  props: {
    className: "container"
    id: "div1"
  }
  children: [
    {
      tag: "p",
      children: "vdom"
    },
    {
      tag: "ul",
      props: {
        styles: "font-size:20px"
      },
      children: [
        {
          tag: "li",
          children: "a"
        }
        // ...
      ]
    }
  ]
}
