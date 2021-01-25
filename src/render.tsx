import React, { FC } from "react";
import { Badge } from "react-bootstrap";

export enum TokenType {
  Artifact,
  Organization,
  Person,
  Location,
  Date,
  Time,
  Money,
  Percent,
  
  Maru,

  SegmentBegin,
  SegmentEnd,
}


interface TokenElement {
  key: number;
  content: string;
  type: TokenType;
}



export const TypeReverseMap = new Map<string, TokenType>([
  ["Artifact", TokenType.Artifact],
  ["Organization", TokenType.Organization],
  ["Person", TokenType.Person],
  ["Location", TokenType.Location],
  ["Date", TokenType.Date],
  ["Time", TokenType.Time],
  ["Money", TokenType.Money],
  ["Percent", TokenType.Percent],

  ["Maru", TokenType.Maru],
])


const TypeVariantMap = new Map<TokenType, string>([
  [TokenType.Artifact, "primary"],
  [TokenType.Organization, "secondary"],
  [TokenType.Person, "success"],
  [TokenType.Location, "danger"],
  [TokenType.Date, "warning"],
  [TokenType.Time, "light"],
  [TokenType.Money, "info"],
  [TokenType.Percent, "dark"],
]);


function renderMarked(type: TokenType, content: string) {
  switch (type) {
    case TokenType.Maru: {
      return <>{content}</>;
    }
    default: {
      return <Badge variant={TypeVariantMap.get(type)}>{content}</Badge>;
    }
  }
}


function render(tokens: Array<TokenElement>) {
  const elementQueue = tokens.map(({ type, content }) => renderMarked(type, content));
  return <>{...elementQueue}</>
}


interface PropsType {
  tokenSeries: Array<TokenElement>;
}


export const TokenRender: FC<PropsType> = ({tokenSeries}) => render(tokenSeries)
