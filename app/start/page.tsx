'use client'

import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { User, Briefcase, Rocket, ArrowLeft, Check, Layout, LayoutTemplate, Plus, LinkIcon, FileText, Trash2, Upload } from 'lucide-react';
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
import Switch from '@mui/material/Switch';

type FormData = {
  goal: 'portfolio' | 'landing';
  
  profilePhoto: string;
  headline?: string;
  description?: string;
  identity: string;
  
  colorTheme?: string;
  layoutStyle?: string;
  darkMode?: boolean;
  
  socials:string[];
  
  projects?: Array<{
    title: string;
    description: string;
    url?: string;
    techStack: string;
    image?: File;
  }>;
  
  experience?: Array<{
    title: string;
    company: string;
    startDate?: Date;
    endDate?: Date;
    description: string;
    techStack: string;
  }>;
  
  services?: Array<{
    title: string;
    description: string;
  }>;
  
  resume?: File;
  additionalNotes?: string;
  preferedLanguage?: string;
  
  domain: string;
  pages: string[];
  techStack: string;
  specialRequests?: string;
  receiveUpdates?: boolean;
};

const steps = [
    { title: "Needed", description: ''},
    { title: "Let's get started", description: 'What do you want to create?'},
    { title: 'What describes you?', description: 'Tell us more about yourself' },
    { title: 'Preferences', description: 'Choose your style'},
    { title: 'Social links', description: 'Connect your profiles (facebook, instagram, github) ...'},
    { title: 'Add projects', description: 'Showcase your work with details' },
    { title: 'Your work experience', description: 'Add your professional experience' },
    { title: 'Your services', description: 'List services you offer' },
    { title: 'Additional Information', description: "Provide any extra details you'd like to include" },
];

export default function StartPage() {
  const { control,register, handleSubmit, watch, setValue } = useForm<FormData>();
  const [step, setStep] = useState(0);
  // const router = useRouter();

  const onSubmit = (data: FormData) => {
    console.log('Collected Data:', data);
  };

  const nextStep = () => {
    if (step === 1 && !watch('goal')) {
      return;
    }
    
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  };
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const currentStep = steps[step];

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
          <Stack sx={{ width: '100%' }} spacing={4}>
              <Stepper alternativeLabel activeStep={step} connector={<QontoConnector />}>
                  {steps.map((step) => (
                      <Step key={step.title}>
                          <StepLabel StepIconComponent={QontoStepIcon}>{step.title}</StepLabel>
                      </Step>
                  ))}
              </Stepper>
          </Stack>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='mt-10 text-center max-w-2xl mx-auto'>
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


              {step === 2 && (
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

                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <Switch
                        checked={watch('darkMode')}
                        onChange={(e, checked) => setValue('darkMode', checked)}
                      />
                      <Label htmlFor="darkMode">Enable Dark Mode by default</Label>
                    </div>
                    <p className="text-sm text-gray-500">Visitors can still switch modes</p>
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

              {step === 6 && (
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

              {step === 8 && (
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

          <div className="mt-6 w-[100%]">
            {step < steps.length - 1 ? (
                <Button type="submit" onClick={nextStep} className='bg-blue-500 cursor-pointer hover:bg-blue-600 duration-100 rounded-full w-[40%]'>
                    Continue
                </Button>
            ) : (
                <Button type="submit" className='bg-blue-500 cursor-pointer hover:bg-blue-600 duration-100 w-[40%] rounded-full'>
                    Generate Site
                </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}