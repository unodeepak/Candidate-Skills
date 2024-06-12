# Candidate Skill Rating Flow

## Requirements

1. **User Table**

   - Structure: `{name: "", role: ""}`
   - `role` is an enum with values: `['candidate', 'reviewer']`

2. **Question and Response Table**

   - Contains a list of questions and candidate responses
   - Questions can have difficulty levels: `['easy', 'medium', 'hard']`

3. **Reviewer Permissions**

   - Reviewers can only review the candidate’s responses from the Question and Response Table.

4. **Skill Aggregation**

   - Both candidates and reviewers can fetch the list of aggregate skills along with ratings.

5. **Authentication**
   - Use any library for authentication.

## Tasks

1. **User Sign Up**

   - Create CRUD API for user sign up.

2. **Rating Candidate’s Response**

   - Create CRUD API for reviewers to rate candidates' responses.

3. **Aggregated Skills and Ratings**
   - Get a list of aggregated skills along with candidates' ratings.
   - Difficulty level has weightage as follows:
     - `easy`: 1
     - `medium`: 2
     - `hard`: 3

### Skill Calculation Formula

\[ \text{Rating} = \frac{(1 \times \text{easy_number_of_questions} \times \text{rating}) + (2 \times \text{medium_number_of_questions} \times \text{rating}) + (3 \times \text{hard_number_of_questions} \times \text{rating})}{(1 \times \text{easy_number_of_questions}) + (2 \times \text{medium_number_of_questions}) + (3 \times \text{hard_number_of_questions})} \]

## Worked Example

### Candidate's Saved Response Data

```json
[
  {
    "skillId": 1,
    "difficulty_level": "easy",
    "question": "What is node?",
    "response": ""
  },
  {
    "skillId": 1,
    "difficulty_level": "easy",
    "question": "What is express?",
    "response": ""
  },
  {
    "skillId": 1,
    "difficulty_level": "hard",
    "question": "How to handle child processes in node?",
    "response": ""
  },
  {
    "skillId": 1,
    "difficulty_level": "medium",
    "question": "What are streams?",
    "response": ""
  }
]
```
