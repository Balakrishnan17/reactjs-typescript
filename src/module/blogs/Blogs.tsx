import React from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { decrement, increment } from "../../features/user/UserSlice";

function ExampleState() {
  // Declare a new state variable, which we'll call "count"
  // const [count, setCount] = useState(0);
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => dispatch(increment())}>Add</button>
      <button onClick={() => dispatch(decrement())}>Subract</button>
    </div>
  );
}

class Blogs extends React.Component {
  render() {
    return (
      <>
        <ExampleState />
        <h2>Blogs</h2>
      </>
    );
  }
}

export default Blogs;
