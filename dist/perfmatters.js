"use strict";function logCRP(){var t=window.performance.timing,o=t.domContentLoadedEventStart-t.domLoading,n=t.domComplete-t.domLoading;document.getElementById("crp-stats").textContent="DCL: "+o+"ms, onload: "+n+"ms"}window.addEventListener("load",function(t){logCRP()});
//# sourceMappingURL=perfmatters.js.map
