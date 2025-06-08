'use client'

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Github, Linkedin, Mail, Home, User, Briefcase, BookOpen, Contact, FileText, Rocket, Code, Palette, PenTool, GraduationCap, Minimize2, Type, Moon, CaseLower, Goal } from 'lucide-react';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import QontoConnector from '@/components/QontoConnector';
import { QontoStepIcon } from '@/components/QontoStepIcon';

type FormData = {
  goal: string;
  identity: string;
  design: string;
  techStack: string;
  socials: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
  domain: string;
  pages: string[];
};

const steps = [
  { title: 'Project Goal', description: 'What do you want to create?'},
  { title: 'Your Profile', description: 'Tell us about yourself' },
  { title: 'Preferences', description: 'Choose your style'},
  { title: 'Social Links', description: 'Connect your profiles'},
  { title: 'Site Pages', description: 'Select needed pages' },
];

const options = {
  goal: [
    { value: 'portfolio', label: 'Portfolio', icon: <Briefcase className="w-5 h-5" /> },
    { value: 'business', label: 'Business', icon: <Briefcase className="w-5 h-5" /> },
    { value: 'resume', label: 'Resume', icon: <FileText className="w-5 h-5" /> },
    { value: 'startup', label: 'Startup', icon: <Rocket className="w-5 h-5" /> },
  ],
  identity: [
    { value: 'developer', label: 'Developer', icon: <Code className="w-5 h-5" /> },
    { value: 'designer', label: 'Designer', icon: <Palette className="w-5 h-5" /> },
    { value: 'freelancer', label: 'Freelancer', icon: <PenTool className="w-5 h-5" /> },
    { value: 'student', label: 'Student', icon: <GraduationCap className="w-5 h-5" /> },
  ],
  design: [
    { value: 'minimal', label: 'Minimal', icon: <Minimize2 className="w-5 h-5" /> },
    { value: 'bold', label: 'Bold', icon: <Type className="w-5 h-5" /> },
    { value: 'dark', label: 'Dark', icon: <Moon className="w-5 h-5" /> },
    { value: 'professional', label: 'Professional', icon: <CaseLower className="w-5 h-5" /> },
  ],
  pages: [
    { value: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { value: 'about', label: 'About', icon: <User className="w-5 h-5" /> },
    { value: 'projects', label: 'Projects', icon: <Briefcase className="w-5 h-5" /> },
    { value: 'blog', label: 'Blog', icon: <BookOpen className="w-5 h-5" /> },
    { value: 'contact', label: 'Contact', icon: <Contact className="w-5 h-5" /> },
  ]
};

export default function StartPage() {
  const { register, handleSubmit, watch, setValue } = useForm<FormData>();
  const [step, setStep] = useState(0);
  const router = useRouter();

  const onSubmit = (data: FormData) => {
    console.log('Collected Data:', data);
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const currentStep = steps[step];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Build Your Website</h1>
          <p className="text-gray-600">Simple steps to create your perfect site</p>
        </div>

        <Stack sx={{ width: '100%' }} spacing={4}>
            <Stepper alternativeLabel activeStep={step} connector={<QontoConnector />}>
                {steps.map((step) => (
                    <Step key={step.title}>
                        <StepLabel StepIconComponent={QontoStepIcon}>{step.title}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Stack>

        <form onSubmit={handleSubmit(onSubmit)} className='mt-6'>
          <Card className="shadow-sm">
            <CardHeader className="border-b p-6">
              <h2 className="text-xl font-semibold text-gray-800">{currentStep.title}</h2>
              <p className="text-gray-500 text-sm">{currentStep.description}</p>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {step === 0 && (
                <div className="space-y-4">
                  <Label className="text-gray-700">What type of website are you building?</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {options.goal.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setValue('goal', option.value)}
                        className={`p-3 border rounded-lg transition-colors flex items-center space-x-2 ${watch('goal') === option.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                      >
                        {option.icon}
                        <span>{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-4">
                  <Label className="text-gray-700">Which best describes you?</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {options.identity.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setValue('identity', option.value)}
                        className={`p-3 border rounded-lg transition-colors flex items-center space-x-2 ${watch('identity') === option.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                      >
                        {option.icon}
                        <span>{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label className="text-gray-700">Choose your design style</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {options.design.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setValue('design', option.value)}
                          className={`p-3 border rounded-lg transition-colors flex items-center space-x-2 ${watch('design') === option.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                        >
                          {option.icon}
                          <span>{option.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="techStack">Your Tech Stack (optional)</Label>
                    <Input
                      id="techStack"
                      {...register('techStack')}
                      placeholder="e.g. React, Node.js, Python"
                      className="border-gray-300 focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label>Connect Your Social Profiles (optional)</Label>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Github className="w-5 h-5 text-gray-500" />
                        <Input
                          placeholder="GitHub username"
                          {...register('socials.github')}
                          className="border-gray-300 focus:border-blue-500"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Linkedin className="w-5 h-5 text-gray-500" />
                        <Input
                          placeholder="LinkedIn username"
                          {...register('socials.linkedin')}
                          className="border-gray-300 focus:border-blue-500"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-5 h-5 text-gray-500" />
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          {...register('socials.email')}
                          className="border-gray-300 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Choose Your Domain</Label>
                    <div className="flex">
                      <Input
                        {...register('domain')}
                        placeholder="yourname"
                        className="border-gray-300 focus:border-blue-500 rounded-r-none"
                      />
                      <span className="inline-flex items-center px-3 bg-gray-100 border border-l-0 border-gray-300 text-gray-600 rounded-r-lg text-sm">
                        .buildoova.app
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <Label>Select the pages you need</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {options.pages.map((page) => (
                      <div key={page.value} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                        <Checkbox
                          id={`page-${page.value}`}
                          value={page.value}
                          {...register('pages')}
                          className="border-gray-300"
                        />
                        <div className="flex items-center space-x-2">
                          {page.icon}
                          <Label htmlFor={`page-${page.value}`} className="cursor-pointer">
                            {page.label}
                          </Label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-between mt-6">
            <Button
                type="button"
                onClick={prevStep}
                disabled={step === 0}
                variant="outline"
                className="border-gray-300"
            >
              Back
            </Button>
            {step < steps.length - 1 ? (
                <Button type="button" onClick={nextStep} className='bg-blue-500 cursor-pointer hover:bg-blue-600 duration-100'>
                    Continue
                </Button>
            ) : (
                <Button type="submit" className='bg-blue-500 cursor-pointer hover:bg-blue-600 duration-100'>
                    Generate Site
                </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}