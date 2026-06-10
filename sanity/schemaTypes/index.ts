import { type SchemaTypeDefinition } from 'sanity'
import { pizzaStyle } from './pizzaStyle'
import { article } from './article'
import { pizzeria } from './pizzeria'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [pizzaStyle, article, pizzeria],
}
