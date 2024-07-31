import React from 'react';
import FileHeader from './FileHeader';
import CodeLine from './CodeLine';
import CodeContent from './CodeContent';

interface CodeHighlightProps {
  title: string;
  fileIcon: string;
  avatarSrc: string;
  children?: React.ReactNode;
}

const CodeHighlight: React.FC<CodeHighlightProps> = ({
  title,
  fileIcon,
  avatarSrc,
  children,
}) => {
  const codeLines = React.Children.toArray(children).map((child, index) => ({
    content: React.isValidElement(child) ? child.props.children : String(child),
    indentation: 0,
  }));

  return (
    <section className="flex flex-col text-xs rounded-md border border-solid bg-blend-normal border-zinc-800 max-w-[813px]">
      <FileHeader title={title} fileIcon={fileIcon} avatarSrc={avatarSrc} />
      {codeLines.map((line, index) => (
        <CodeLine
          key={index}
          content={line.content}
          indentation={line.indentation}
          lineNumber={index + 1}
        />
      ))}
      <CodeContent>
        {`function InsertYourCodeHere() {
  let theme = someTheme;
  if (toggleTheme === pressed) {
    theme = someOtherTheme;
  }
}`}
      </CodeContent>
    </section>
  );
};

export default CodeHighlight;
