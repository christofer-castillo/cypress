export const countryNames = `
query countryName {
    countries{
      name,
      code
    }
  }
`;

export const queryTodos = `
query todos {
    getTodos  {
        id
        description
    }
}
`;