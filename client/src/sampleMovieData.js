const movies = [
  {
    title: 'Independence Day',
    description: 'Will Smith battles'
  },
  {
    title: 'Sandbox',
    description: 'Kids again!'
  },
  {
    title: 'UFC fight night!',
    description: 'Cybgorg will dominate as usual'
  }
]

export const add = ({title, description}) => {
  movies.push({title, description});
}

export default movies;
