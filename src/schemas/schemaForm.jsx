import { z } from 'zod'

export const schemaForm = z
   .object({
      firstName: z.string().min(3, 'Imię musi składać się co najmniej z 3 znaków'),
      lastName: z.string().min(3, 'Nazwisko musi składać się co najmniej z 3 znaków'),
      email: z.string().email('Nieprawidłowy adres e-mail'),
      phone: z.string().refine(value => /^[0-9]{9}$/.test(value), 'Numer telefonu musi składać się z 9 cyfr'),
      learningMode: z.enum(['offline', 'online'], {
         errorMap: () => ({ message: 'Proszę wybrać formę nauki.' }),
      }),
      technologies: z
         .array(z.enum(['React', 'NodeJS', 'HTML', 'CSS', 'NextJS']))
         .min(1, 'Proszę wybrać co najmniej jedną technologię'),
      cv: z.any().superRefine((file, ctx) => {
         if (!file || file.length === 0) {
            ctx.addIssue({
               code: z.ZodIssueCode.custom,
               message: 'Musisz dodać załącznik jako zdjęcie.',
            })
         } else if (file.length === 1 && !['image/jpeg', 'image/png'].includes(file[0].type)) {
            ctx.addIssue({
               code: z.ZodIssueCode.custom,
               message: 'Załączony plik musi być w formacie JPEG lub PNG.',
            })
         }
      }),
      experience: z.boolean(),
      experiences: z.array(
         z.object({
            technology: z.enum(['JavaScript', 'Python', 'C++', 'Inne']),
            level: z.enum(['1', '2', '3', '4', '5']),
         }),
      ),
   })
   .superRefine((data, ctx) => {
      if (data.experience && data.experiences.length === 0) {
         ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['experiences'],
            message: 'Gdy zaznaczono doświadczenie w programowaniu, lista doświadczeń nie może być pusta.',
         })
      }
   })
