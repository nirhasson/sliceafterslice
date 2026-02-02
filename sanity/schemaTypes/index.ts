import { type SchemaTypeDefinition } from 'sanity'
import { pizzaStyle } from './pizzaStyle'
import { article } from './article'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [pizzaStyle, article],
}
