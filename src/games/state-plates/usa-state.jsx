export const UsaState = (props) => {
  return (
    <path d={props.dimensions} fill={props.fill} data-name={props.state} className={`${props.state} state`} onClick={props.onClickState}>
      <title>{props.stateName}</title>
    </path>
  );
}
