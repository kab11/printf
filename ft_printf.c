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

int shift_list(pf_token *ftoken)
{
	int i;

	i = 0;
	if (ftoken->hash == 1)
		i++;
	if (ftoken->left == 1)
		i++;
	if (ftoken->space == 1)
		i++;
	if (ftoken->plus == 1)
		i++;
	if (ftoken->zero == 1)
		i++;
	if (ftoken->width)
	{
		while (ftoken->width > 0)
		{
			ftoken->width /= 10;
			i++;
		}
	}
	if (ftoken->precision == 0)
		i++;
	else
	{
		while (ftoken->precision > 0)
		{
			ftoken->precision /= 10;
			i++;
		}
		i++;
	}
	// i++;
	// printf("i: %d\n", i);
	return (i);
}

int ft_printf(const char *fmt, ...)
{
	/* Define temporary variables */
	pf_token ftoken;
	t_pf_store f;
	int i = 0;
	int ret = 0;
	va_list ap;

	ft_bzero(&ftoken, sizeof(ftoken));
	ft_bzero(&f, sizeof(f));
	va_start(ap, fmt); /* Set where the variable length part of the argument list ends */
	while (fmt[i] != '\0')
	{
		if (fmt[i] == '%' && fmt[i + 1] == '%')
		{
			ret += write(1, "%", 1);
			i += 1;
		}
		else if (fmt[i] == '%' && fmt[i + 1] != '%')
		{
			// printf("i: %d\n", i);
			ret += parse_params((char *)fmt + ++i, ap, &ftoken);
			i += shift_list(&ftoken);
			// printf("i after: %d\n", i);
			// i++;
		}
		else
			ret += write(1, &fmt[i++], 1);
		// printf("ret: %d\n", ret);
	}
	// 	printf("NOT FOUND\n");
	va_end(ap);	/* Clean up */
	// write(1, fmt, ft_strlen(fmt));
    return (ret);
}

int main(void)
{
	// char *str = "this is a string";
	// char c = 'a';
	// char *d = "abc";
	// int a = INT_MAX;
	// double b = 2.2222222222222222222222;
	// long double b2 = 2.2222222222222222222222;
	// long double a = 123.2222222222222222222;
	// int *b = &a;
	// int i = 24;
	
	/* % followed by % writes a single % to the stream */
	// printf("(printf): %%\t");
	// ft_printf("(ft_printf): %%\n");

	/* Characters */
	// printf("---CHARACTERS---\n");
	// printf("printf: %c%c\there<======\n", c, 65);
	// ft_printf("printf: %c%c\there<======\n", c, 65);
	// ft_printf("int: %f\n", );
	// ft_printf("%f here\n", b);
	// ft_printf("%Lf here\n", b2);
	
	/* Strings */	
	// printf("---STRINGS---\n");
	// printf("String (printf): %s\there<======\n", str);
	// ft_printf("String (ft_printf): %s\there<======\n", str);

	// printf("%#s\n", );	
	/* Pointer to character */
	// printf("Pointer (printf): %p\t", d);
	// ft_printf("Pointer (ft_printf): %p\n", d);

	/* d & i are signed decimal integers
	 * precision is padded on the lift with zeros; default precision is 1 
	 * when 0 is printed with na explicit precision 0, the output is empty  */
	// printf("d (printf): %d\t", i);
	// ft_printf("(ft_printf): %.19Lf\n", a);
	double a = 1234.123;
	// int b = 99999;
	// ft_printf("% #-15.1f<----\n", a);
	// printf("% #-15.1f<----\n", a);

	// ft_printf("d prints: %d\n", b);
	// ft_printf("here: ")

	ft_printf("%+5.0f<----\n", a);
	printf("%#.0f<----\n", a);

	// ft_printf("%- 3.0f<\n", a);
	// printf("%- 3.0f<\n", a);

	// ft_printf("%- 5.0f<\n", a);
	// printf("%- 5.0f<\n", a);

	// ft_printf("%5f\n", a);
	// printf("%5f\n", a);

	// printf("hhd (printf): %hhd\t", (char)i);	/* signed char */
	// ft_printf("hhd (ft_printf): %hhd\n", (char)i);
	// printf("hd (printf): %hd\t", (short)i);	/* short int */
	// ft_printf("hd (ft_printf): %hd\n", (short)i);
	// printf("ld (printf): %ld\t", 650000L);	/* long int */
	// ft_printf("ld (ft_printf): %ld\n", 650000L);
	// printf("lld (printf): %lld\t", (long long int)i);	/*long long int */
	// ft_printf("lld (ft_printf): %lld\n", (long long int)i);

	// ft_printf("%.5d\n", -345);
	// ft_printf("%.3d\n", 1000);

	// printf("%.1012s\n", "five");
	// printf("%.s\n", "ten");

	// ft_printf("%.0f\n", b);
	// ft_printf("%.0f.\n", b);
	// ft_printf("%.1f\n", b);
	// ft_printf("%.2f\n", b);
	// ft_printf("%.6f\n", b);
	// ft_printf("%.000002f\n", b); 
	// ft_printf("%-0f\n", b); 
	// ft_printf("%#.f\n", b); 
	// ft_printf("%+.9f\n", b); 
	// ft_printf("%.7f\n", b);
	// ft_printf("%05f\n", b);

	// ft_printf("%f\t %f \n", b, a);
	// printf("%-0f\n", b);
	// printf("%.0f\n", b);
	// printf("%.0f.\n", b);
	// printf("%.1f\n", b);
	// printf("%.2f\n", b);
	// printf("%.6f\n", b);
	// printf("%.000002f\n", b); 
	// printf("%f\n", b); 
	// printf("%.7f\n", b);
	// printf("%#.f\n", b); 

	// printf(":%s:\n", "Hello, world!");
	// printf(":%15s:\n", "Hello, world!");
	// printf(":%.10s:\n", "Hello, world!");
	// printf(":%-10s:\n", "Hello, world!");
	// printf(":%-15s:\n", "Hello, world!");
	// printf(":%.15s:\n", "Hello, world!");
	// printf(":%15.10s:\n", "Hello, world!");
	// printf(":%-15.10s:\n", "Hello, world!");

	// ft_printf("The color: %s\n", "blue");
	// ft_printf("First number: %d\n", 12345);
	// ft_printf("Second number: %04d\n", 25);
	// ft_printf("Third number: %i\n", 1234);
	// printf("Float number: %f\n", 1.4);
	// ft_printf("Float number: %f\n", -1.4);
	// ft_printf("Hexadecimal: %x\n", 255);
	// ft_printf("Octal: %o\n", 255);
	// ft_printf("Unsigned value: %u\n", 150);
	// ft_printf("Just print the percentage sign %%\n");

	// printf("float16   :%0.5f|\n",  1000.1 );
	// printf("float17   :%0.1f|\n",  2000.123456789123456789 );
	// printf("float18   :%0.2f|\n",  3000.123456789123456789 );
	// printf("float19   :%0.10f|\n", 4000.123456789123456789 );
	// printf("float20   :%0.20f|\n", -5000.123456789123456789 );
	// printf("float21   :%0f|\n",    6000.123456789123456789 );
	// printf("float22   :%0.f|\n",   7000.123456789123456789 );

	// ft_printf("float: %lf there\n", 1.12);
	// ft_printf("%lf\n", -1.12);
	// ft_printf("float: %f\n", 123);
	// ft_printf("float: %12.5f there\n", 1.12);
	// float: 100.12000            there (left-justified)
	// float:            100.12000 there (right-justified)
	// ft_printf("float: %-4f\n", 100.12);
	// ft_printf("float: %-05.4f\n", 100.12);
	// printf("float: %05.f\n", 100.12);
	// printf("float: %-4f\n", 100.12);
	// printf("float: %-5.4f\n", 100.12);

	// ft_printf("float: %ld\n", LONG_MIN);
	// double d = 0.12346789123;
	// ft_printf("%d\n", 123);

	// printf("The color: %s\n", "blue");
	// printf("First number: %d\n", 12345);
	// printf("Second number: %04d\n", 25);
	// printf("Third number: %i\n", 1234);
	// printf("Float number: %3.2f\n", 3.14159);
	// printf("Hexadecimal: %x\n", 255);
	// printf("Octal: %o\n", 255);
	// printf("Unsigned value: %u\n", 150);
	// printf("Just print the percentage sign %%\n");

	// printf("Signed Decimal (ft_printf): %.5d\n", 123);
	// printf("Signed Decimal (ft_printf): %.5d\n", -123);
	// printf("Signed Deciaml: %.5d\n",0); /*** DOESN'T WORK ****/
	// printf("Signed Deciaml: %.5d\n",-7);
	// printf("Signed Deciaml: %.5d\n",1560133635);
	// printf("Signed Deciaml: %.5d\n",-2035065302);

	// ft_printf("Signed Decimal (ft_printf): %d\n", 123);
	// ft_printf("Signed Decimal (ft_printf): %d\n", -123);
	// ft_printf("Signed Deciaml: %d\n",0); /*** DOESN'T WORK ****/
	// ft_printf("Signed Deciaml: %d\n",-7);
	// ft_printf("Signed Deciaml: %d\n",1560133635);
	// ft_printf("Signed Deciaml: %d\n",-2035065302);
	// ft_printf("Signed Deciaml (right-justified): %5d",0)
	// ft_printf("Signed Deciaml (right-justified): %5d",-7)
	// ft_printf("Signed Deciaml (right-justified): %5d",1560133635)
	// ft_printf("Signed Deciaml (right-justified): %5d",-2035065302)
	// ft_printf("Signed Deciaml (left-justified): %-5d\n",0);
	// ft_printf("Signed Deciaml (left-justified): %-5d\n",-7);
	// ft_printf("Signed Deciaml (left-justified): %-5d\n",1560133635);
	// ft_printf("Signed Deciaml (left-justified): %-5d\n",-2035065302);
	// ft_printf("Signed Deciaml (zero-fill): %05d",0)
	// ft_printf("Signed Deciaml (zero-fill): %05d",-7)
	// ft_printf("Signed Deciaml (zero-fill): %05d",1560133635)
	// ft_printf("Signed Deciaml (zero-fill): %05d",-2035065302)

	// ft_printf("l => unsigned long int: %ld\n", 650000L);
	// ft_printf("Signed Integer (ft_printf): %i\n", 123);
	// ft_printf("Signed Integer (ft_printf): %i\n", -123);
	// ft_printf("Signed Integer (ft_printf): %f\n", 123.123456);
	// ft_printf("Signed Integer (ft_printf): %.3f\n", -123.123456);
	// ft_printf("Unsigned Integer (ft_printf): %u\n", -123);
	// ft_printf("printf: %llx\n", UINTMAX_MAX);
	// ft_printf("Unsigned hexadecimal integer, lowercase (ft_printf): %x\n", -2545);
	// ft_printf("Unsigned hexadecimal integer, LOWERCASE (ft_printf): %x\n", 2545);
	// ft_printf("Unsigned hexadecimal integer, UPPERCASE (ft_printf): %X\n", -2545);
	// ft_printf("Unsigned hexadecimal integer, UPPERCASE (ft_printf): %X\n", 2545);
	// printf("Unsigned octal (ft_printf): %o\n", '\0');
	// printf("Unsigned octal (ft_printf): %o\n", 33);
	// ft_printf("%p\n", b); /* 7ffeed2309f8 */;
	// ft_printf("Hexidecimal floating point, lowercase (ft_printf): %a\n", 1.000001);
	// ft_printf("Hexidecimal floating point, uppercase (ft_printf): %A\n", 1.000001);
	// printf("hhd: %hhd\n", 45);

	// printf("printf: %o\n", 123123);
	// ft_printf("%o\n", 123123);
	
	return 0;
}
