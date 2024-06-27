export const Switch = ({test, children}) => {
  return children.find(child => {
    return child.props.value === test;
  });
};


export const Case = ({children, value}) => {
  return children; // I don't want do add container around my cases !
};