const kgRef = document.getElementById("kg");
const lbRef = document.getElementById("lb");
const ozRef = document.getElementById("oz");

const convertFromKg = () => {
  const kgValue = kgRef.value;
  lbRef.value = (kgValue * 2.205).toFixed(2);
  ozRef.value = (kgValue * 35.274).toFixed(2);
};

const convertFromLb = () => {
  const lbValue = lbRef.value;
  kgRef.value = (lbValue / 2.205).toFixed(2);
  ozRef.value = (lbValue / 16).toFixed(2);
};

const convertFromOz = () => {
  const ozValue = ozRef.value;
  kgRef.value = (ozValue / 35.274).toFixed(2);
  lbRef.value = (ozValue / 16).toFixed(2);
};

kgRef.addEventListener("input", convertFromKg);
lbRef.addEventListener("input", convertFromLb);
ozRef.addEventListener("input", convertFromOz);
window.addEventListener("load", convertFromKg);
