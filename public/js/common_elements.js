//footer and navbar
function loadCommonElements() {
  console.log($("#navbarPlaceholder").load("../common/nav.html"));
  console.log($("#footerPlaceholder").load("../common/footer.html"));
}
loadCommonElements(); //invoke the function
