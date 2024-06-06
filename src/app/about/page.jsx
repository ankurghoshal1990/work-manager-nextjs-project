
// This function is used to simulate a sleeping behaviour of the current thread 
const takeTime = async () => {
  await new Promise((resolve) => {
    setTimeout(resolve,3000);
  });
}
const about = async () => {
  await takeTime();
  return (
    <div>about</div>
  )
}

export default about