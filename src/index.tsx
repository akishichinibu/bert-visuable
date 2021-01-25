import React, { Component, FC, useState } from 'react';
import ReactDom from 'react-dom';
import { TokenRender, TypeReverseMap } from './render';


interface RawTokenType {
  content: string;
  type: string;
}


interface ResponseType {
  result: RawTokenType[]
}


class TokenVisuable extends Component<ResponseType> {

  render() {
    const temp = this.props.result.map(({ content, type }, t) => ({
      key: t,
      content: content,
      type: TypeReverseMap.get(type),
    }));

    return <>
      <TokenRender tokenSeries={temp}></TokenRender>
    </>;
  };
}


const App: FC = () => {
  const [buffer, setBuffer] = useState<ResponseType | null>(null);

  const getResult = (content) => {
    const req = new Request("/predict", {
      method: "POST",
      credentials: "same-origin",
      body: JSON.stringify({
        content: content,
      }),
    });

    fetch(req).then(async (res) => {
      const data = await res.json();
      setBuffer(data);
    });
  }

  return <>
    <textarea onChange={e => getResult(e.currentTarget.value)}></textarea>
    {buffer === null ? <></> : <TokenVisuable result={buffer.result} />}
  </>
}


ReactDom.render(<App />, document.getElementById('app'));
