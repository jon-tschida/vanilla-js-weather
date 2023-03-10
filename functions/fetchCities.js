export default function (endPoint, arr) {
  fetch(endPoint)
    .then((response) => {
      if (response.status === 200) return response.json();
      else
        alert(
          `Data failed to be retrieved with this error: ${response.status}`
        );
    })
    .then((data) => arr.push(...data));
}
