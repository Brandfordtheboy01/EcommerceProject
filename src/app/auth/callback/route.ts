import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') || '/'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Update email verification status in database
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        await supabase
          .from('users')
          .update({ email_verified: true })
          .eq('id', session.user.id)
      }
      
      return redirect(next)
    }
  }

  // Return the user to an error page with instructions
  return redirect('/auth/auth-code-error')
}
