import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
  background: rgba(17, 24, 39, 0.62);
`;

const Dialog = styled.div`
  width: min(520px, 100%);
  max-height: min(680px, calc(100vh - 36px));
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.35);

  @media (max-width: 520px) {
    max-height: calc(100vh - 24px);
  }
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 18px;
  border-bottom: 1px solid #e5e7eb;
`;

const Title = styled.div`
  text-align: left;
`;

const Eyebrow = styled.div`
  color: #6b7280;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const Heading = styled.h2`
  margin: 2px 0 0;
  color: #111827;
  font-size: 20px;
  line-height: 1.2;
`;

const CloseButton = styled.button`
  width: 36px;
  height: 36px;
  flex: 0 0 auto;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #fff;
  color: #111827;
  cursor: pointer;
  font-size: 22px;
  line-height: 1;
`;

const Body = styled.div`
  overflow-y: auto;
  padding: 22px 22px 18px;
`;

const StepNumber = styled.div`
  width: 30px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  border-radius: 999px;
  background: #111827;
  color: #fff;
  font-size: 14px;
  font-weight: 800;
`;

const StepTitle = styled.h3`
  margin: 0 0 10px;
  color: #111827;
  font-size: 24px;
  line-height: 1.2;
`;

const StepBody = styled.p`
  margin: 0;
  color: #374151;
  font-size: 16px;
  line-height: 1.55;
  text-align: left;
`;

const Demo = styled.div`
  margin: 22px 0 0;
  padding: 16px;
  border: 1px solid #d8dee4;
  border-radius: 8px;
  background: #fff;
`;

const TileRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 7px;
`;

const Tile = styled.span<{ state?: 'absent' | 'correct' | 'present' }>`
  width: 42px;
  height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.3);
  background: ${({ state }) =>
    state === 'correct'
      ? '#00C800'
      : state === 'present'
      ? '#FFFF00'
      : '#f7f8f9'};
  color: #111827;
  font-size: 20px;
  font-weight: 800;

  @media (max-width: 420px) {
    width: 36px;
    height: 36px;
    font-size: 17px;
  }
`;

const RemainingDemo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #6b7280;

  strong {
    color: #111827;
    font-size: 26px;
    line-height: 1;
  }
`;

const FlowDemo = styled.div`
  display: grid;
  justify-items: center;
  gap: 8px;

  span {
    width: min(250px, 100%);
    padding: 8px 10px;
    border: 1px solid #d8dee4;
    border-radius: 6px;
    background: #f7f8f9;
    color: #1f2933;
    font-weight: 650;
  }

  b {
    color: #6b7280;
  }
`;

const Footer = styled.div`
  padding: 14px 18px 18px;
  border-top: 1px solid #e5e7eb;
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  gap: 7px;
  margin-bottom: 14px;
`;

const Dot = styled.button<{ active: boolean }>`
  width: ${({ active }) => (active ? '22px' : '8px')};
  height: 8px;
  border: 0;
  border-radius: 999px;
  background: ${({ active }) => (active ? '#111827' : '#d1d5db')};
  cursor: pointer;
  padding: 0;
`;

const Actions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const ActionButton = styled.button<{ primary?: boolean }>`
  min-height: 42px;
  border: 1px solid ${({ primary }) => (primary ? '#111827' : '#d1d5db')};
  border-radius: 8px;
  background: ${({ primary }) => (primary ? '#111827' : '#fff')};
  color: ${({ primary }) => (primary ? '#fff' : '#111827')};
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;

  &:disabled {
    cursor: default;
    opacity: 0.45;
  }
`;

const steps = [
  {
    title: 'Make one five-letter guess',
    body:
      'Start by typing any valid five-letter word. In Kilordle, that one guess is submitted to every active puzzle at the same time.',
    demo: (
      <TileRow aria-label="Example guess">
        {'CRANE'.split('').map((letter) => (
          <Tile key={letter}>{letter}</Tile>
        ))}
      </TileRow>
    ),
  },
  {
    title: 'Read the clues on each board',
    body:
      'Each board answers with its own clue pattern. Green means right letter and position, yellow means the letter appears elsewhere, and a pale tile means that letter does not help that board.',
    demo: (
      <TileRow aria-label="Example clue result">
        <Tile state="correct">C</Tile>
        <Tile state="absent">R</Tile>
        <Tile state="present">A</Tile>
        <Tile state="absent">N</Tile>
        <Tile state="correct">E</Tile>
      </TileRow>
    ),
  },
  {
    title: 'Solved words disappear',
    body:
      'When your guess exactly matches one of the hidden words, that puzzle leaves the remaining pool. Watch the Remaining number shrink as you clear boards.',
    demo: (
      <RemainingDemo>
        <span>Remaining</span>
        <strong>1000</strong>
        <span aria-hidden="true">→</span>
        <strong>997</strong>
      </RemainingDemo>
    ),
  },
  {
    title: 'Use shared clues',
    body:
      'The goal is to clear every hidden word with as few guesses as possible. Strong guesses reveal letters for many boards, then later guesses separate similar words.',
    demo: (
      <FlowDemo>
        <span>One guess</span>
        <b aria-hidden="true">↓</b>
        <span>Many boards update</span>
        <b aria-hidden="true">↓</b>
        <span>Fewer words remain</span>
      </FlowDemo>
    ),
  },
];

function HowToPlayModal({ onClose }: { onClose: () => void }) {
  const [stepIndex, setStepIndex] = useState(0);
  const step = steps[stepIndex];
  const isLastStep = stepIndex === steps.length - 1;

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft')
        setStepIndex((value) => Math.max(0, value - 1));
      if (event.key === 'ArrowRight')
        setStepIndex((value) => Math.min(steps.length - 1, value + 1));
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <Overlay role="presentation">
      <Dialog
        aria-labelledby="how-to-play-modal-title"
        aria-modal="true"
        role="dialog"
      >
        <Top>
          <Title>
            <Eyebrow>How to Play</Eyebrow>
            <Heading id="how-to-play-modal-title">Learn Kilordle</Heading>
          </Title>
          <CloseButton aria-label="Close tutorial" onClick={onClose}>
            ×
          </CloseButton>
        </Top>
        <Body>
          <StepNumber>{stepIndex + 1}</StepNumber>
          <StepTitle>{step.title}</StepTitle>
          <StepBody>{step.body}</StepBody>
          <Demo>{step.demo}</Demo>
        </Body>
        <Footer>
          <Dots aria-label="Tutorial slides">
            {steps.map((item, index) => (
              <Dot
                active={index === stepIndex}
                aria-label={`Go to slide ${index + 1}`}
                key={item.title}
                onClick={() => setStepIndex(index)}
              />
            ))}
          </Dots>
          <Actions>
            <ActionButton
              disabled={stepIndex === 0}
              onClick={() => setStepIndex((value) => Math.max(0, value - 1))}
            >
              Back
            </ActionButton>
            <ActionButton
              onClick={() =>
                isLastStep
                  ? onClose()
                  : setStepIndex((value) =>
                      Math.min(steps.length - 1, value + 1)
                    )
              }
              primary
            >
              {isLastStep ? 'Start Playing' : 'Next'}
            </ActionButton>
          </Actions>
        </Footer>
      </Dialog>
    </Overlay>
  );
}

export default HowToPlayModal;
