// Materialize CSS Logic
document.addEventListener('DOMContentLoaded', function() {
    // SideNav logic
    var sidenavEl = document.querySelectorAll('.sidenav');
    var sidenav = M.Sidenav.init(sidenavEl);

    // Dropdown logic
    var dropdownEl = document.querySelectorAll('.dropdown-trigger');
    var dropdown = M.Dropdown.init(dropdownEl);

    // Collapsible logic
    var collapseEl = document.querySelectorAll('.collapsible');
    var collapse = M.Collapsible.init(collapseEl);

    // Image Material Boxed logic
    var imgEl = document.querySelectorAll('.materialboxed');
    var img = M.Materialbox.init(imgEl);
});