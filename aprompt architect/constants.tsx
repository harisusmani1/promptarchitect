
import React from 'react';
import { Step, StepKey } from './types';
import { UserCircleIcon, BookOpenIcon, ScaleIcon, LibraryIcon, TerminalIcon } from './components/icons';

export const STEPS: Step[] = [
  {
    key: StepKey.CoreIdentity,
    title: 'Core Identity',
    description: "Define the AI's persona. Who is the LLM? A world-class expert, a creative storyteller, a Socratic tutor? This sets the foundation for the tone and style of the response.",
    placeholder: 'e.g., You are a seasoned market analyst specializing in the European tech sector...',
    icon: <UserCircleIcon className="h-6 w-6" />,
  },
  {
    key: StepKey.Context,
    title: 'Context',
    description: 'Provide the necessary background, scope, and surrounding information. What does the LLM need to know to perform the task effectively?',
    placeholder: 'e.g., The goal is to produce a competitive analysis for a new B2B SaaS product targeting small to medium-sized businesses...',
    icon: <BookOpenIcon className="h-6 w-6" />,
  },
  {
    key: StepKey.Constraints,
    title: 'Constraints',
    description: 'Set the rules and boundaries. Specify the desired format, length, style, and what to avoid. The more specific, the better.',
    placeholder: 'e.g., The output must be a markdown table. The tone should be formal. Avoid any mention of our internal project names...',
    icon: <ScaleIcon className="h-6 w-6" />,
  },
  {
    key: StepKey.Canon,
    title: 'Canon',
    description: 'Supply a body of knowledge or specific examples to guide the output. This is crucial for few-shot prompting and ensuring stylistic consistency.',
    placeholder: 'e.g., Here is an example of a perfect response from a previous session:\n\n**Analysis of Competitor A:**\n- Strengths: ...\n- Weaknesses: ...',
    icon: <LibraryIcon className="h-6 w-6" />,
  },
  {
    key: StepKey.Command,
    title: 'Command',
    description: 'Give the final, clear, and explicit instruction. What is the ultimate task you want the LLM to perform?',
    placeholder: 'e.g., Based on all the above, perform a SWOT analysis and present it as a markdown table.',
    icon: <TerminalIcon className="h-6 w-6" />,
  },
];
