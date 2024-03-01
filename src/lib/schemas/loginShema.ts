import * as z from 'zod';

export default z.object({
  login: z.string().email(),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
});
