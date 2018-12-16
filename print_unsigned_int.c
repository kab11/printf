/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   print_unsigned_int.c                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kblack <marvin@42.fr>                      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/12/10 22:25:04 by kblack            #+#    #+#             */
/*   Updated: 2018/12/10 22:25:06 by kblack           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

void pf_dec(va_list ap)
{
	printf("---- ENTERING pf_dec ----\n");
	/* needs to be changed from an int into a char in order to be written */
	int num;
	static char *int_str;
	static short i;
	static short neg;

	num = va_arg(ap, int);
	i = sizeof(int) * 4;
	int_str = ft_strnew(i + 1);	/* create block of memory */
	neg = (num < 0 ? -1 : 1);	/* determine if number is less than 0 */
	int_str[i] = '\0';	
	while (--i > 0) /* will take 15 characters 16th is '\0' */
	{
		int_str[i] = num % 10 + '0';
		num /= 10;
	}
	while (int_str[++i] == '0')
		;
	while (int_str[i])
	{
		ft_putchar(int_str[i]);
		i++;
	}
}

void pf_unsigned(const char **pf, va_list ap)
{
	if (*(*pf) == 'u')	/* unsigned deciaml integer */
		pf_dec(ap);
	// else if (*(*pf) == 'x')	/* unsigned hexadecimal integer, lowercase */
	// 	pf_char(ap);
	// else if (*(*pf) == 'X') /* unsigned hexadecimal integer, uppercase */
	// 	pf_char(ap);
	// else if (*(*pf) == 'o') /* unsigned octal */
	// 	pf_char(ap);
	// else if (*(*pf) == 'p')	/* pointer address */
	// 	pf_char(ap);
	// else if (*(*pf) == 'a') /* hexadecimal floating point, lowercase */
	// 	pf_char(ap);
	// else if (*(*pf) == 'A') /* hexadecimal floating point, uppercase */
	// 	pf_char(ap);
}