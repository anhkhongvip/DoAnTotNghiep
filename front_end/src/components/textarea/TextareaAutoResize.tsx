import React, { ChangeEvent, useRef, useState, useLayoutEffect } from "react";
import styled from "styled-components";

interface styleProps {
    readonly fontSize: string ;
}

const TextAreaAutoResizeStyles = styled.textarea<styleProps>`
  overflow: hidden;
  width: 100%;
  border-radius: 0.8rem;
  border: 2px solid gray;
  line-height: 1.5;
  outline: none;
  resize: none;
  padding: 2.4rem;
  font-size: ${props => props.fontSize ? props.fontSize : '1.6rem'};
  &:focus {
    border-color: black;
  }
  &.error {
    border-color: #c13515;
    &:focus {
        border-color:#c13515;
    }
  }
`;

type Props = {
    content: string;
    setContent: (content: string) => void;
    fontSize?: string
    height?: string
    error: boolean
  };

const TextareaAutoResize = ({ content, setContent, error, fontSize = '', height = '140px' }: Props) => { 
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [textareaHeight, setTextareaHeight] = useState(height);
  const handleChange = (event: ChangeEvent) => {
    const { value } = event.target as HTMLTextAreaElement;
    console.log(value);
    
    setContent(value);
  };

  useLayoutEffect(() => {
    console.log(parseInt(`${textareaRef?.current?.scrollHeight}px`));
    
    if(parseInt(`${textareaRef?.current?.scrollHeight}px`) > parseInt(height))
    {
        setTextareaHeight(`${textareaRef?.current?.scrollHeight}px`);
    }
    else {
        setTextareaHeight(height);
    }
    
  }, [content]);
  return (
    <TextAreaAutoResizeStyles fontSize={fontSize} className={`${error ? 'error' : ''}`}
      autoComplete="off"
      style={{
        height: textareaHeight,
      }}
      value={content}
      ref={textareaRef}
      onChange={handleChange}
    ></TextAreaAutoResizeStyles>
  );
};

export default TextareaAutoResize;
