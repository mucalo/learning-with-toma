# Copilot Instructions for Learning with Toma

## Project purpose
Learning with Toma is a website that provides a platform where users can generate small tasks, problems or excercises for children with different neuroatypical conditions. 

## Target audience
- Speech-Language Pathologists (SLPs)
- Speech and Language Therapists (SLTs)
- Speech and Language Professionals
- Special Education Teachers
- Kindergarten and Early Childhood Educators
- Parents of children with neuroatypical conditions
- Psychologists and other professionals working with children with neuroatypical conditions

## Targeted neuroatypical conditions
- Autism Spectrum Disorder (ASD)
- Attention Deficit Hyperactivity Disorder (ADHD)
- Dyslexia
- Dyspraxia
- Disgraphia

## Main goals
- Provide a user-friendly platform for generating small tasks, problems, or exercises for children with neuroatypical conditions.
- Offer a variety of task types and difficulty levels to cater to different needs and abilities.

## Multi-lingual support
- The website should support multiple languages to accommodate users from different linguistic backgrounds.
- Languages available should be easily selectable and switchable by the user.
- Languages available are: English, Croatian, Serbian
- Whenever any changes are made, always make sure that the translations are updated accordingly.
- Whenever any changes are made or new features are added, always make sure it is architecturally easy to add new languages in the future.

## Preferred approach
- Make small, focused improvements rather than unnecessary changes.
- Preserve consistency with the existing style and structure.
- Favor accessibility, clarity, and usefulness over visual clutter.
- Every exercise must render its worksheet with the shared `<app-worksheet>` component (`src/app/worksheet/`), so the instruction is printed at the top of every page and problems are never split across pages.

## Notes
If the website’s goals or audience change, update this file so future changes stay aligned with the intended direction.
