'use client'

import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { User, Briefcase, Rocket, ArrowLeft, Check, Layout, LayoutTemplate, Plus, LinkIcon, FileText, Trash2, Upload, Shapes, Shield, CheckCircle } from 'lucide-react';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import QontoConnector from '@/components/QontoConnector';
import { QontoStepIcon } from '@/components/QontoStepIcon';
import Image from 'next/image';
import { Textarea } from '@/components/ui/textarea';
import { DatePicker } from '@/components/ui/date-picker';
import { toast } from 'sonner';
import { generateSite } from '@/services/ai';
import Loading from '@/components/Loading';
import Preview from '@/components/Preview';

export type FormData = {
  goal: 'portfolio' | 'landing';
  
  colorTheme?: string;
  layoutStyle?: string;
  socials?: string[];
  projects?: Array<{
    title: string;
    description: string;
    url?: string;
    techStack: string;
    image?: File;
  }>;
  services?: Array<{
    title: string;
    description: string;
  }>;
  
  profilePhoto: string;
  headline?: string;
  description?: string;
  identity?: string;
  experience?: Array<{
    title: string;
    company: string;
    startDate?: Date;
    endDate?: Date;
    description: string;
    techStack: string;
  }>;
  resume?: File;
  additionalNotes?: string;
  preferedLanguage?: string;
  techStack?: string;
  
  brandDescription?: string;
  brandPurpose?: string;
  heroImage: string;
  logo: string;
  targetAudience?: string;
  audienceDemographics: {
    minAge?: number;
    maxAge?: number;
    genderFocus?: 'all' | 'male' | 'female' | 'non-binary';
  };
  audiencePsychographics: {
    challenges?: string;
    interests?: string[];
  };
  audienceGeography?: string;
  audienceBehavior: {
    platforms?: string[];
  };
  clientLogos?: Array<File | string>;
  testimonials?: Array<{
    name: string;
    title: string;
    quote: string;
    avatar?: File | string;
  }>;
  contactInfo:{
    email?: string;
    phoneNumber?: string;
    physicalAddress?: string;
  },
  primaryCta?: string;
  secondaryCta?: string;
  features?: string[];
  pricingPlans?: Array<{
    name: string;
    price: string;
    features: string[];
  }>;
};

const portfolioSteps = [
  { title: "Needed", description: ''},
  { title: "Let's get started", description: 'What do you want to create?' },
  { title: 'About You', description: 'Tell us more about yourself' },
  { title: 'Preferences', description: 'Choose your style' },
  { title: 'Social Links', description: 'Connect your profiles' },
  { title: 'Add Projects', description: 'Showcase your work' },
  { title: 'Work Experience', description: 'Add professional history' },
  { title: 'Services', description: 'List services you offer' },
  { title: 'Final Touches', description: 'Additional details' },
  { title: 'Publish', description: 'Review and launch' },
];

const landingPageSteps = [
  { title: "Needed", description: ''},
  { title: "Let's get started", description: 'What do you want to create?' },
  { title: "Brand & Hero", description: "Define your brand's purpose, upload your logo, add a compelling description, and choose a stunning hero image to make a strong first impression."},
  { title: 'Preferences', description: 'Choose your style' },
  { title: 'Social Links', description: 'Connect your profiles' },
  { title: 'Add Projects', description: 'Showcase your work' },
  { title: 'Target Audience', description: 'Who is this for?' },
  { title: 'Services', description: 'List services you offer' },
  { title: 'Social Proof', description: 'Add testimonials or logos' },
  { title: 'Contact info', description: 'Let clients know how to reach you easily and professionally.' },
  { title: 'Publish', description: 'Review and launch' },
];


export default function StartPage() {
  const { control, register, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: {
      goal: 'portfolio'
    }
  });
  const [step, setStep] = useState(0);
  const [code,setCode] = useState('');
  const goal = watch('goal');
  const steps = goal === 'portfolio' ? portfolioSteps : landingPageSteps;
  const [loading,setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    try{
      setLoading(true);
      const res = await generateSite(data)
      const cleanedRes = res.data.response.replace(/\\n/g, '').replace(/\\/g, '');
      setCode(cleanedRes);
    }catch{
      toast.error("An error occured from server")
    }finally{
      setLoading(false)
    }
  };

  const nextStep = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));
  const currentStep = steps[step];

  if(code) return <Preview code={code}/>
  if(loading) return <Loading isAiGenerates={true} />
  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
      <Button
          type="button"
          onClick={prevStep}
          disabled={step === 0}
          variant="outline"
          className="border-gray-300 cursor-pointer"
      >
        <ArrowLeft className='text-gray-600'/>
      </Button>
      <div className="mx-auto">
        <div className={`${(step === 0 || step === 1) && 'hidden'} w-[90%] mx-auto`}>
          {step > 0 && (
            <div className="w-[90%] mx-auto">
              <Stack sx={{ width: '100%' }} spacing={4}>
                <Stepper alternativeLabel activeStep={step} connector={<QontoConnector />}>
                  {steps.map((stepConfig) => (
                    <Step key={stepConfig.title}>
                      <StepLabel StepIconComponent={QontoStepIcon}>
                        {stepConfig.title}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Stack>
            </div>
          )}
        </div>

        <form className='mt-10 text-center max-w-2xl mx-auto'>
              <h2 className={`${step === 0 && 'hidden'} text-3xl font-semibold text-gray-800 mb-3`}>{currentStep.title}</h2>
              <Label className="block text-lg font-medium text-gray-700 mb-4">
                {currentStep.description}
              </Label>

              {step === 0 && (
                <div className="text-center py-4 px-6 max-w-2xl mx-auto">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">Lets Build Your Website</h1>
                    <p className="text-lg text-gray-600 mb-6">
                      Answer a few simple questions and we will create a custom website tailored just for you.
                    </p>
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-2">
                      <h3 className="font-medium text-blue-800 mb-2">What you will need:</h3>
                      <ul className="text-gray-700 space-y-1 w-[80%] text-center mx-auto">
                        <li className="flex items-center">
                          <Check className="w-4 h-4 text-green-500 mr-2" /> Basic info about your project
                        </li>
                        <li className="flex items-center">
                          <Check className="w-4 h-4 text-green-500 mr-2" /> Your design preferences
                        </li>
                        <li className="flex items-center">
                          <Check className="w-4 h-4 text-green-500 mr-2" /> Social/contact details (optional)
                        </li>
                        <li className="flex items-center">
                          <Check className="w-4 h-4 text-green-500 mr-2" /> Your professional background for porfolios
                        </li>
                        <li className="flex items-center">
                          <Check className="w-4 h-4 text-green-500 mr-2" /> Product/Service details for landing pages
                        </li>
                        <li className="flex items-center">
                          <Check className="w-4 h-4 text-green-500 mr-2" /> Prefered color scheme
                        </li>
                        <li className="flex items-center">
                          <Check className="w-4 h-4 text-green-500 mr-2" /> Any special feautures needed
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-6 mt-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <button
                      type="button"
                      onClick={() => setValue('goal', 'portfolio', { shouldValidate: true })}
                      className={`p-6 border-2 rounded-xl transition-all flex flex-col items-center text-center ${
                        watch('goal') === 'portfolio' 
                          ? 'border-blue-500 bg-blue-50 shadow-md' 
                            : 'border-gray-200 hover:border-blue-300'
                      } cursor-pointer`}
                    >
                      <Briefcase className="w-10 h-10 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Portfolio</h3>
                      <p className="text-gray-600">
                        Showcase your work, skills, and professional achievements
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setValue('goal', 'landing', { shouldValidate: true })}
                      className={`p-6 border-2 rounded-xl transition-all flex flex-col items-center text-center ${
                        watch('goal') === 'landing' 
                          ? 'border-blue-500 bg-blue-50 shadow-md' 
                            : 'border-gray-200 hover:border-blue-300'
                      } cursor-pointer`}
                    >
                      <Rocket className="w-10 h-10 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Landing Page</h3>
                      <p className="text-gray-600">
                        Promote a product, service, or special offer with focused messaging
                      </p>
                    </button>
                  </div>
                </div>
              )}


              {step === 2 && goal === 'portfolio' && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label className="text-gray-700">Profile Photo</Label>
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-300">
                        {watch('profilePhoto') ? (
                          <Image
                            width={100}
                            height={100}
                            src={watch('profilePhoto')} 
                            alt="Profile preview" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="w-10 h-10 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <label className="flex flex-col items-center px-4 py-2 bg-white rounded-md border border-gray-300 cursor-pointer hover:bg-gray-50">
                          <span className="text-sm font-medium text-gray-700">
                            {watch('profilePhoto') ? 'Change Photo' : 'Upload Photo'}
                          </span>
                          <Input 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={async (e) => {
                              if (e.target.files && e.target.files[0]) {
                                const file = e.target.files[0];
                                
                                if (file.size > 2 * 1024 * 1024) {
                                  toast.error('File size too large (max 2MB)')
                                  return;
                                }

                                const previewUrl = URL.createObjectURL(file);
                                setValue('profilePhoto', previewUrl);
                              }
                            }}
                          />
                        </label>
                        <p className="text-xs text-gray-500 mt-1">JPG or PNG, max 2MB</p>
                        {watch('profilePhoto') && (
                          <button
                            type="button"
                            onClick={() => {
                              setValue('profilePhoto', '');
                              // Optionally call API to remove from server
                            }}
                            className="text-xs text-red-500 hover:text-red-700 mt-1"
                          >
                            Remove photo
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="headline">Professional Headline</Label>
                    <Input
                      id="headline"
                      {...register('headline')}
                      placeholder="e.g. Frontend Developer | React Specialist"
                      className="border-gray-300 focus:border-blue-500"
                    />
                    <p className="text-sm text-gray-500">This appears below your name on your profile</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">About You</Label>
                    <Textarea
                      id="description"
                      {...register('description')}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Tell us about yourself, your skills, and experience..."
                    ></Textarea>
                    <p className="text-sm text-gray-500">Write a brief professional bio (200-300 words)</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="techStack">Technical Skills (optional)</Label>
                    <Input
                      id="techStack"
                      {...register('techStack')}
                      placeholder="e.g. React, Node.js, Python, Figma"
                      className="border-gray-300 focus:border-blue-500 outline-blue-600"
                    />
                    <p className="text-sm text-gray-500">Separate skills with commas</p>
                  </div>
                </div>
              )}

              {step === 2 && goal === 'landing' && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label className="text-gray-700">Brand logo</Label>
                    <div className="flex items-center space-x-4">
                      <div className="w-40 h-20 rounded-md bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-300">
                        {watch('logo') ? (
                          <Image
                            width={100}
                            height={100}
                            src={watch('logo')} 
                            alt="logo preview" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Shapes className="w-10 h-10 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <label className="flex flex-col items-center px-4 py-2 bg-white rounded-md border border-gray-300 cursor-pointer hover:bg-gray-50">
                          <span className="text-sm font-medium text-gray-700">
                            {watch('logo') ? 'Change Photo' : 'Upload Photo'}
                          </span>
                          <Input 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={async (e) => {
                              if (e.target.files && e.target.files[0]) {
                                const file = e.target.files[0];
                                
                                if (file.size > 2 * 1024 * 1024) {
                                  toast.error('File size too large (max 2MB)')
                                  return;
                                }

                                const previewUrl = URL.createObjectURL(file);
                                setValue('logo', previewUrl);
                              }
                            }}
                          />
                        </label>
                        <p className="text-xs text-gray-500 mt-1">JPG or PNG, max 2MB</p>
                        {watch('logo') && (
                          <button
                            type="button"
                            onClick={() => {
                              setValue('logo', '');
                              // Optionally call API to remove from server
                            }}
                            className="text-xs text-red-500 hover:text-red-700 mt-1"
                          >
                            Remove photo
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="brandPurpose">Brand Purpose</Label>
                    <Input
                      id="brandPurpose"
                      {...register('brandPurpose')}
                      placeholder="e.g., Innovative SaaS solutions for modern businesses"
                      className="border-gray-300 focus:border-blue-500"
                    />
                    <p className="text-sm text-gray-500">Your company&apos;s mission or value proposition</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="brandDescription">Brand Description</Label>
                    <Textarea
                      id="brandDescription"
                      {...register('brandDescription')}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Describe your brand, products, and what makes you unique..."
                    />
                    <p className="text-sm text-gray-500">Detailed overview (200-300 words)</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="heroImage">Hero Image</Label>
                    <div className="flex items-center gap-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center">
                        <Upload className="w-6 h-6 text-gray-400 mb-2" />
                        <Input
                          id="heroImage"
                          type="file"
                          accept="image/*"
                          {...register('heroImage')}
                          className="hidden"
                        />
                        <Label
                          htmlFor="heroImage"
                          className="cursor-pointer text-blue-600 hover:text-blue-800"
                        >
                          Click to upload
                        </Label>
                        <p className="text-xs text-gray-500 mt-1">Recommended: 1200x630px</p>
                      </div>
                      {watch('heroImage') && (
                        <div className="text-sm text-gray-600">
                          Image selected: {typeof watch('heroImage') === 'string' ? watch('heroImage') : watch('heroImage')?.[0]?.name}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                </div>
              )}


              {step === 3 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label className="text-gray-700">Select Your Color Theme</Label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                      {[
                        { name: 'Blue', value: 'blue', bg: 'bg-blue-500' },
                        { name: 'Indigo', value: 'indigo', bg: 'bg-indigo-500' },
                        { name: 'Emerald', value: 'emerald', bg: 'bg-emerald-500' },
                        { name: 'Rose', value: 'rose', bg: 'bg-rose-500' },
                        { name: 'Orange', value: 'orange', bg: 'bg-orange-500' },
                        { name: 'Yellow', value: 'yellow', bg: 'bg-yellow-500' },
                        { name: 'Purple', value: 'purple', bg: 'bg-purple-500' },
                        { name: 'Teal', value: 'teal', bg: 'bg-teal-500' },
                        { name: 'Cyan', value: 'cyan', bg: 'bg-cyan-500' },
                        { name: 'Lime', value: 'lime', bg: 'bg-lime-500' },
                        { name: 'Pink', value: 'pink', bg: 'bg-pink-500' },
                        { name: 'Fuchsia', value: 'fuchsia', bg: 'bg-fuchsia-500' },
                        { name: 'Sky', value: 'sky', bg: 'bg-sky-500' },
                        { name: 'Violet', value: 'violet', bg: 'bg-violet-500' },
                        { name: 'Amber', value: 'amber', bg: 'bg-amber-500' },
                        { name: 'Red', value: 'red', bg: 'bg-red-500' },
                        { name: 'Green', value: 'green', bg: 'bg-green-500' },
                        { name: 'Slate', value: 'slate', bg: 'bg-slate-500' },
                        { name: 'White', value: 'white', bg: 'bg-white' },
                        { name: 'Black', value: 'black', bg: 'bg-black' },
                      ].map((color) => (
                        <button
                          key={color.value}
                          type="button"
                          onClick={() => setValue('colorTheme', color.value)}
                          className={`h-12 rounded-md flex items-center justify-center ${color.bg} ${watch('colorTheme') === color.value ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                          aria-label={color.name}
                        >
                          {watch('colorTheme') === color.value && (
                            <Check className={`w-5 h-5 ${color.value === 'white' && 'text-black'} ${ color.value !== 'white' && 'text-white'} `} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-gray-700">Preferred Layout Style</Label>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { 
                          value: 'modern', 
                          label: 'Modern', 
                          desc: 'Clean lines, ample whitespace',
                          icon: <Layout className="w-5 h-5" />
                        },
                        { 
                          value: 'classic', 
                          label: 'Classic', 
                          desc: 'Traditional sections with borders',
                          icon: <LayoutTemplate className="w-5 h-5" />
                        },
                      ].map((layout) => (
                        <button
                          key={layout.value}
                          type="button"
                          onClick={() => setValue('layoutStyle', layout.value)}
                          className={`p-4 border rounded-lg text-left ${watch('layoutStyle') === layout.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                        >
                          <div className="flex items-center space-x-3 mb-2">
                            {layout.icon}
                            <span className="font-medium">{layout.label}</span>
                          </div>
                          <p className="text-sm text-gray-600">{layout.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <Label className="text-gray-700">Add Your Social Links</Label>
                  
                  <div className="flex items-center gap-3">
                    <LinkIcon className="w-5 h-5 text-gray-400" />
                    <Input
                      placeholder="https://example.com/profile"
                      {...register('socials.0' as const)}
                      className="flex-1"
                    />
                  </div>

                  {(watch('socials')?.slice(1) ?? []).map((_, index) => (
                    <div key={index} className="flex items-center gap-3 mt-3">
                      <LinkIcon className="w-5 h-5 text-gray-400" />
                      <Input
                        placeholder="https://another-social-site.com/username"
                        {...register(`socials.${index + 1}` as const)}
                        className="flex-1"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const currentSocials = watch('socials') ?? [''];
                          const updatedSocials = currentSocials.filter((_, i) => i !== index + 1);
                          setValue('socials', updatedSocials.length ? updatedSocials : ['']);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    className="mt-3"
                    onClick={() => {
                      const currentSocials = watch('socials') ?? [''];
                      setValue('socials', [...currentSocials, '']);
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add another social link
                  </Button>
                </div>
              )}


              {step === 5 && (
                <div className="space-y-6">

                  <div className="space-y-4">
                    {(watch('projects') || []).map((project, index) => (
                      <div key={index} className="p-4 border rounded-lg space-y-3">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">Project {index + 1}</h4>
                          <button
                            type="button"
                            onClick={() => {
                              const updatedProjects = watch('projects')?.filter((_, i) => i !== index);
                              setValue('projects', updatedProjects);
                            }}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        </div>

                        <Input
                          placeholder="Project title"
                          {...register(`projects.${index}.title`)}
                          className="border-gray-300"
                        />

                        <Textarea
                          placeholder="Project description"
                          {...register(`projects.${index}.description`)}
                          className="w-full p-2 border border-gray-300 rounded"
                          rows={3}
                        />

                        <Input
                          placeholder="Project URL (optional)"
                          {...register(`projects.${index}.url`)}
                          className="border-gray-300"
                        />

                        <div>
                          <Label>Technologies Used</Label>
                          <Input
                            placeholder="React, Node.js, MongoDB (comma separated)"
                            {...register(`projects.${index}.techStack`)}
                            className="border-gray-300 mt-2"
                          />
                        </div>

                        <div>
                          <Label>Project Image</Label>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                const updatedProjects = [...(watch('projects') || [])];
                                updatedProjects[index] = { 
                                  ...updatedProjects[index], 
                                  image: e.target.files[0] 
                                };
                                setValue('projects', updatedProjects);
                              }
                            }}
                            className="border-gray-300 mt-2"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const currentProjects = watch('projects') || [];
                      setValue('projects', [
                        ...currentProjects,
                        { title: '', description: '', url: '', techStack: '' }
                      ]);
                    }}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Another Project
                  </Button>
                </div>
              )}
              {step === 6 && goal === 'landing' &&(

                <div className="space-y-6">
                  {/* Primary Audience */}
                  <div className="space-y-2">
                    <Label htmlFor="targetAudience">Who is your primary audience?*</Label>
                    <Input
                      id="targetAudience"
                      {...register('targetAudience')}
                      placeholder="e.g. SaaS startups, freelance designers, e-commerce managers"
                      className="border-gray-300 focus:border-blue-500"
                      required
                    />
                    <p className="text-sm text-gray-500">Be specific about industries or roles</p>
                  </div>

                  {/* Demographic Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Age Range</Label>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          placeholder="Min"
                          {...register('audienceDemographics.minAge')}
                          className="w-20"
                        />
                        <Input
                          type="number"
                          placeholder="Max"
                          {...register('audienceDemographics.maxAge')}
                          className="w-20"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Gender Focus</Label>
                      <select
                        {...register('audienceDemographics.genderFocus')}
                        className="border-gray-300 rounded-md w-full p-2"
                      >
                        <option value="all">All Genders</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="non-binary">Non-binary</option>
                      </select>
                    </div>
                  </div>

                  {/* Psychographics */}
                  <div className="space-y-2">
                    <Label>Key Challenges</Label>
                    <Textarea
                      {...register('audiencePsychographics.challenges')}
                      placeholder="What problems does your audience face?"
                      rows={3}
                      className="border-gray-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Values & Interests</Label>
                    <Input
                      {...register('audiencePsychographics.interests')}
                      placeholder="e.g. sustainability, productivity tools, luxury brands"
                    />
                    <p className="text-sm text-gray-500">Separate with commas</p>
                  </div>

                  {/* Geographic Targeting */}
                  <div className="space-y-2">
                    <Label>Geographic Focus (Optional)</Label>
                    <Input
                      {...register('audienceGeography')}
                      placeholder="e.g. North America, Europe, Global"
                    />
                  </div>

                  {/* Behavioral */}
                  <div className="space-y-2">
                    <Label>Where do they spend time online?</Label>
                    <div className="flex flex-wrap gap-2">
                      {['LinkedIn', 'Instagram', 'TikTok', 'Twitter', 'Industry Forums', 'Reddit'].map((platform) => (
                        <div key={platform} className="flex items-center">
                          <input
                            type="checkbox"
                            id={platform}
                            {...register(`audienceBehavior.platforms`)}
                            value={platform}
                            className="mr-2"
                          />
                          <Label htmlFor={platform} className="text-sm">{platform}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              { step === 8 && goal === 'landing' && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>Trusted By Logos</Label>
                  <p className="text-sm text-gray-500">Upload logos of companies/clients you&apos;ve worked with</p>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="flex flex-wrap gap-4 mb-4">
                      {watch('clientLogos')?.map((logo, index) => (
                        <div key={index} className="relative group">
                          <div className="w-24 h-16 bg-gray-100 flex items-center justify-center rounded-md overflow-hidden">
                            {typeof logo === 'string' ? (
                              <Image 
                                src={logo} 
                                alt={`Client logo ${index + 1}`} 
                                width={96}
                                height={64}
                                className="object-contain p-2"
                              />
                            ) : logo instanceof File ? (
                              <Image
                                width={100}
                                height={100}
                                src={URL.createObjectURL(logo)}
                                alt={`Uploaded logo ${index + 1}`}
                                className="object-contain w-full h-full p-2"
                                onLoad={() => URL.revokeObjectURL(URL.createObjectURL(logo))} // Clean up memory
                              />
                            ) : (
                              <span className="text-xs text-gray-400">New logo</span>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = watch('clientLogos')?.filter((_, i) => i !== index) || [];
                              setValue('clientLogos', updated);
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <Input
                      id="clientLogos"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          const files = Array.from(e.target.files);
                          const currentLogos = watch('clientLogos') || [];
                          setValue('clientLogos', [...currentLogos, ...files]);
                        }
                      }}
                      className="hidden"
                    />
                    <Label
                      htmlFor="clientLogos"
                      className="cursor-pointer flex flex-col items-center justify-center gap-2 text-center"
                    >
                      <Upload className="w-5 h-5 text-gray-400" />
                      <span className="text-blue-600 hover:text-blue-800 text-sm">
                        Click to upload logos
                      </span>
                      <span className="text-xs text-gray-500">PNG/JPG (Max 5MB each)</span>
                    </Label>
                  </div>                    
                </div>

                <div className="space-y-4">
                  <Label>Customer Testimonials</Label>
                  
                  {watch('testimonials')?.map((testimonial, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3 relative group">
                      <button
                        type="button"
                        onClick={() => {
                          const currentTestimonials = watch('testimonials') || []; 
                          const updated = [...currentTestimonials];
                          updated.splice(index, 1);
                          setValue('testimonials', updated);
                        }}
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <Label>Name</Label>
                          <Input
                            {...register(`testimonials.${index}.name`)}
                            placeholder="Customer name"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label>Role/Company</Label>
                          <Input
                            {...register(`testimonials.${index}.title`)}
                            placeholder="e.g. CEO at Company"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <Label>Testimonial</Label>
                        <Textarea
                          {...register(`testimonials.${index}.quote`)}
                          rows={3}
                          placeholder="What they said about your product/service..."
                        />
                      </div>

                      <div className="space-y-1">
                        <Label>Avatar (Optional)</Label>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              setValue(`testimonials.${index}.avatar`, e.target.files[0]);
                            }
                          }}
                        />
                      </div>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setValue('testimonials', [
                        ...(watch('testimonials') || []),
                        { name: '', title: '', quote: '' }
                      ]);
                    }}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Testimonial
                  </Button>
                </div>
              </div>
              )}

              {step === 9 && goal === 'landing' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">Email Address</Label>
                      <Input
                        id="contactEmail"
                        {...register('contactInfo.email')}
                        placeholder="contact@yourbusiness.com"
                        type="email"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactPhone">Phone Number</Label>
                      <Input
                        id="contactPhone"
                        {...register('contactInfo.phoneNumber')}
                        placeholder="+212 600-123456"
                        type="tel"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="physicalAddress">Physical Address</Label>
                    <Textarea
                      id="physicalAddress"
                      {...register('contactInfo.physicalAddress')}
                      rows={3}
                      placeholder="123 Business Ave, City, Country"
                    />
                  </div>

                  {/* Interactive Map Preview */}
                  <div className="space-y-2">
                    <Label>Map Preview</Label>
                    <div className="rounded-lg overflow-hidden border">
                      <iframe
                        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAk7xBMH2_kdu2FEG2vmOsMWARyN3wZxEM&q=${encodeURIComponent(watch('contactInfo.physicalAddress') || 'new york, USA')}`}
                        width="100%"
                        height="300"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                    <p className="text-sm text-gray-500">
                      Map will update automatically when address changes
                    </p>
                  </div>

                  <div className="flex items-center gap-4 pt-4">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-green-500" />
                      <span className="text-sm">We never share your contact info</span>
                    </div>
                  </div>
                </div>
              )}

              {((step === 10 && goal === 'landing') || (step === 9 && goal === 'portfolio')) && (
                <div className="max-w-md mx-auto text-center p-8 space-y-6">
                  <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                  
                  <h2 className="text-2xl font-bold">
                    {goal === 'portfolio' ? 'Portfolio Complete!' : 'Landing Page Ready!'}
                  </h2>
                  
                  <p className="text-gray-600">
                    Please review all your information carefully before publishing. 
                    Check that everything appears as you want it to be seen publicly.
                  </p>
                </div>
              )}
              
              {step === 6 && goal === 'portfolio' &&(
                <div className="space-y-6">

                  <div className="space-y-4">
                    {(watch('experience') || []).map((exp, index) => (
                      <div key={index} className="p-4 border rounded-lg space-y-3">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">Experience #{index + 1}</h4>
                          <button
                            type="button"
                            onClick={() => {
                              const updatedExp = watch('experience')?.filter((_, i) => i !== index);
                              setValue('experience', updatedExp);
                            }}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        </div>

                        <Input
                          placeholder="Job Title (e.g., Frontend Developer)"
                          {...register(`experience.${index}.title`)}
                          className="border-gray-300"
                        />

                        <Input
                          placeholder="Company Name"
                          {...register(`experience.${index}.company`)}
                          className="border-gray-300"
                        />

                        <div className="grid grid-cols-2 gap-3">
                          <Controller
                            name={`experience.${index}.startDate`}
                            control={control}
                            render={({ field }) => (
                              <DatePicker
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="Select start date"
                              />
                            )}
                          />
                          <Controller
                            name={`experience.${index}.endDate`}
                            control={control}
                            render={({ field }) => (
                              <DatePicker
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="Select end date"
                              />
                            )}
                          />
                        </div>

                        <Textarea
                          placeholder="Description of your role and achievements"
                          {...register(`experience.${index}.description`)}
                          className="w-full p-2 border border-gray-300 rounded"
                          rows={3}
                        />

                        <Input
                          placeholder="Technologies used (comma separated)"
                          {...register(`experience.${index}.techStack`)}
                          className="border-gray-300"
                        />
                      </div>
                    ))}
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const currentExp = watch('experience') || [];
                      setValue('experience', [
                        ...currentExp,
                        { 
                          title: '', 
                          company: '', 
                          startDate: undefined, 
                          endDate: undefined, 
                          description: '', 
                          techStack: '' 
                        }
                      ]);
                    }}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Another Experience
                  </Button>
                </div>
              )}

              {step === 7 && (
                <div className="space-y-6">

                  <div className="space-y-4">
                    {(watch('services') || []).map((service, index) => (
                      <div key={index} className="p-4 border rounded-lg space-y-3">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">Service {index + 1}</h4>
                          <button
                            type="button"
                            onClick={() => {
                              const updatedServices = watch('services')?.filter((_, i) => i !== index);
                              setValue('services', updatedServices);
                            }}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        </div>

                        <Input
                          placeholder="Service title (e.g., Web Development)"
                          {...register(`services.${index}.title`)}
                          className="border-gray-300"
                        />

                        <Textarea
                          placeholder="Service description"
                          {...register(`services.${index}.description`)}
                          className="w-full p-2 border border-gray-300 rounded"
                          rows={3}
                        />
                      </div>
                    ))}
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const currentServices = watch('services') || [];
                      setValue('services', [
                        ...currentServices,
                        { title: '', description: '' }
                      ]);
                    }}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Another Service
                  </Button>
                </div>
              )}

              {step === 8 && goal === 'portfolio' &&(
                <div className="space-y-6">

                  <div className="space-y-3">
                    <Label>Upload Resume (PDF recommended)</Label>
                    <div className="flex items-center gap-4">
                      {watch('resume') ? (
                        <div className="flex items-center gap-2 text-sm text-green-600">
                          <FileText className="w-5 h-5" />
                          <span>Resume uploaded</span>
                          <button
                            type="button"
                            onClick={() => setValue('resume', undefined)}
                            className="text-red-500 hover:text-red-700 ml-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors">
                          <Upload className="w-8 h-8 mb-2 text-gray-400" />
                          <p className="text-sm text-gray-500">
                            <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                          </p>
                          <Input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                setValue('resume', e.target.files[0]);
                              }
                            }}
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Additional Notes</Label>
                    <Textarea
                      placeholder="Anything else you'd like us to know..."
                      {...register('additionalNotes')}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Your prefered language</Label>
                    <Input
                      placeholder="e.g English"
                      {...register('additionalNotes')}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              )}
        </form>
        <div className="mt-6 w-[100%] mx-auto flex justify-center">
          {step < steps.length - 1 ? (
            <Button 
              type="button" 
              onClick={nextStep}
              className='bg-blue-500 cursor-pointer hover:bg-blue-600 duration-100 rounded-full w-[20%] mx-auto'
            >
              Continue
            </Button>
          ) : (
            <Button 
              type="button" 
              onClick={handleSubmit(onSubmit)}
              className='bg-blue-500 cursor-pointer hover:bg-blue-600 duration-100 w-[20%] rounded-full'
            >
              Generate Site
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}