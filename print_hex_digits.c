/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   print_hex_digits.c                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kblack <marvin@42.fr>                      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/01/24 13:16:27 by kblack            #+#    #+#             */
/*   Updated: 2019/01/24 13:16:36 by kblack           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

void handle_hex_hash(pf_token *pf, char *str)
{
	if ((pf->flag.hash == 1 && str[0] != '\0') || pf->ctype == 'p')
	{
		if (pf->u.x || pf->u.p)
			pf->out += write(1, "0x", 2);
		else if (pf->u.X)
			pf->out += write(1, "0X", 2);
		else if (pf->ctype)
			pf->out += write(1, "0", 1);
	}
	else if (pf->ctype == 'o' && pf->flag.hash == 1 && pf->flag.prec >= 0)
		pf->out += write(1, "0", 1);

}

void print_hex_width(pf_token *pf, char *int_str)
{
	int len;
	int i;

	i = 0;
	len = (int)ft_strlen(int_str);
	if (pf->flag.hash == 1 && (int_str[0] != '\0' && int_str[0] != '0'))
	{
		pf->flag.width -= (pf->ctype == 'o') ? 1 : 0;
		pf->flag.width -= (pf->ctype == 'x') ? 2 : 0;
	}
	if (pf->flag.prec >= 0)
	{
		while (pf->flag.width - i++ > len)
			pf->out += (pf->flag.zero == 1) ? write(1, "0", 1) : write(1, " ", 1);
		pf->out += (len == 0 && pf->flag.dot == 0) ? write(1, "0", 1) : 0;
	}
	else
	{
		while (pf->flag.width - i++ > len)
			pf->out += (pf->flag.zero == 1) ? write(1, "0" , 1) : write(1, " ", 1);
	}
}

void print_hex_digits(pf_token *pf, char *int_str)
{
	if (pf->flag.zero == 1)
	{
		handle_hex_hash(pf, int_str);
		print_hex_width(pf, int_str);
		pf->out += write(1, int_str, ft_strlen(int_str));
	}
	else if (pf->flag.left == 1)
	{
		handle_hex_hash(pf, int_str);
		pf->out += write(1, int_str, ft_strlen(int_str));
		print_hex_width(pf, int_str);
	}
	else
	{
		print_hex_width(pf, int_str);
		handle_hex_hash(pf, int_str);
		pf->out += write(1, int_str, ft_strlen(int_str));
	}
}