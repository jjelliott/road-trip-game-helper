export function LineBreak({lines}){
  let breaks = [];
  for (let i = 0; i < lines; i++) {
    breaks[i] = <br key={i}/>
  }
  return <>
    {breaks}
  </>
}