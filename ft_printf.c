/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_printf.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kblack <marvin@42.fr>                      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/11/14 22:13:17 by kblack            #+#    #+#             */
/*   Updated: 2018/11/14 22:13:18 by kblack           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

/* - va_start is called with 2 argumenrs; the variable declared of the type va_list & the name of the last parameter of the function
 *	 each subsequent invocation of the va_arg macro yielsd the next argument; doesn't return anything 
 * - the first argument to va_arg is the va_list & the 2nd is the type of the next argument passed to the funvtion
 * - va_end macros must be called on the va_list before the function returns*/

/*	1. The types must match 
	2. There is a default argument promotion to unnamed arguments; a flost is automatically promoted to a double
	   arguments of types narrower than an int will be promoted to int/unsigned int*/

// va_arg function fetches an argument in a variable argument list
// type va_arg(va_list ap, type); 'type' is the type of argument 

/* va_start macro initializes ap for subsequent use by va_arg and va_end 
 * void va_start(va_list ap, last)
 *		ap : an object of type va_list that itinialized so that successive invocations of va_arg will
 *			return the values of the parameters following paramN
 *		last: is the identifier to the rightmost parameter int he variable parameter lis in the function
 *				definition (the one before the ,...); is paramN is declared with the register storage
 *				class, with a function of array type, or with a type that is not compatible with the 
 *				type that results after application of the default argument promotions, the behavior is undefined 
 */

/* va_arg macroexpands to an expression that has the type and value of the next argument in the call
 * type va_arg(va_list ap, type); 
 * 		ap: an object of type va_list that was initialized by a prior invocation of va_start
 * 		type: a type name specifying the type of the parameter to be retrieved
 */

int ft_printf(const char *fmt, ...)
{
	/* Define temporary variables */
	va_list ap;  
	int ret;
	char *pf;
	pf_token ftoken;
	int i;

	ret = 0;
	i = 0;
	ft_bzero(&ftoken, sizeof(ftoken));
	va_start(ap, fmt); /* Set where the variable length part of the argument list ends */
	if ((pf = ft_strchr(fmt, '%'))) //pass fmt which is the 1st argument 
	{
		// if %% then write '%'
		if ((pf[i + 1]) == '%')
			write(1, "%\n", 2);
		// else do what's below
		else
			ret += parse_params(&pf[i + 1], ap, &ftoken); /* START PARSING! */
	}
	else
		printf("NOT FOUND\n");
	va_end(ap);	/* Clean up */
    return (ret);
}

int main(void)
{
	
	/* Characters */
	// ft_printf("Characters (ft_printf): %c\n", 't');
	// ft_printf("String (ft_printf): %s\n", "there you go smarty pants");

	// ft_printf("Signed Decimal (ft_printf): %d\n", 123);
	// ft_printf("Signed Decimal (ft_printf): %d\n", -123);
	// ft_printf("Signed Integer (ft_printf): %i\n", 123);
	// ft_printf("Signed Integer (ft_printf): %i\n", -123);

	// ft_printf("Unsigned Integer (ft_printf): %u\n", 123);
	// ft_printf("Unsigned Integer (ft_printf): %u\n", -123);
	ft_printf("Unsigned hexadecimal integer, lowercase (ft_printf): %x\n", -2545);
	ft_printf("Unsigned hexadecimal integer, LOWERCASE (ft_printf): %x\n", 2);
	ft_printf("Unsigned hexadecimal integer, UPPERCASE (ft_printf): %X\n", -2545);
	ft_printf("Unsigned hexadecimal integer, UPPERCASE (ft_printf): %X\n", 100);
	ft_printf("Unsigned octal (ft_printf): %o\n", 012);
	ft_printf("Unsigned octal (ft_printf): %o\n", 33);
	
	return 0;
}
