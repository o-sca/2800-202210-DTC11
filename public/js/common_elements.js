//footer and navbar
function loadSkeleton() {
  console.log($("#navbarPlaceholder").load("../common/nav.html"));
  console.log($("#footerPlaceholder").load("../common/footer.html"));
}
loadSkeleton(); //invoke the function
