/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   char_handler.c                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: kblack <marvin@42.fr>                      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/01/22 16:02:49 by kblack            #+#    #+#             */
/*   Updated: 2019/01/22 16:02:58 by kblack           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

void print_ch_width(pf_token *pf)
{
	int i;

	i = 0;
	while (pf->flag.width - i++ > 1)
		pf->out += (pf->flag.zero == 1 ? write(1, "0", 1) : write(1, " ", 1));
}

void char_arg(va_list ap, pf_token *pf, int *ch)
{
	*ch = va_arg(ap, int);
	if (!*ch)
	{
		if (pf->flag.left == 1)
		{
			pf->out += write(1, "\0", 1);
			print_ch_width(pf);
		}
		else
		{
			print_ch_width(pf);
			pf->out += write(1, "\0", 1);
		}
	}
	else if (pf->flag.left == 1)
	{
		pf->out += write(1, ch, 1);
		print_ch_width(pf);
	}
	else
	{
		print_ch_width(pf);
		pf->out += write(1, ch, 1);
	}
}

void null_str(pf_token *pf)
{
	int len;
	char *null;

	null = ft_strdup("(null)");
	len = ++pf->flag.prec;
	if (pf->flag.left == 1)
	{
		pf->out += write(1, null, ft_strlen(null));
		while (pf->flag.width > pf->flag.prec)
		{
			pf->out += (pf->flag.zero == 1 ? write(1, "0", 1) : write(1, " ", 1));
			pf->flag.width--;
		}
	}
	else
	{
		while (pf->flag.width > pf->flag.prec)
		{
			pf->out += (pf->flag.zero == 1 ? write(1, "0", 1) : write(1, " ", 1));
			pf->flag.width--;
		}
		pf->out += write(1, null, ft_strlen(null));
	}	
	free(null);
}

void left_margin_str(pf_token *pf, char *str)
{
	int i;
	int len;

	i = 0;
	len = pf->flag.width - (int)ft_strlen(str);
	if (pf->flag.prec < 1)
	{
		pf->out += write(1, str, ft_strlen(str));
		while (len-- > 0)
			pf->out += (pf->flag.zero == 1 ? write(1, "0", 1) : write(1, " ", 1));
	}
	else
	{
		i = 0;
		pf->out += write(1, str, ft_strlen(str));
		while (len-- > 0)
			pf->out += (pf->flag.zero == 1 ? write(1, "0", 1) : write(1, " ", 1));
	}
}

void right_margin_str(pf_token *pf, char *str)
{
	int len;
	int i;

	i = 0;
	len = pf->flag.width - (int)ft_strlen(str);
	if (pf->flag.prec < 1)
	{
		while (len-- > 0)
			pf->out += (pf->flag.zero == 1 ? write(1, "0", 1) : write(1, " ", 1));
		pf->out += write(1, str, ft_strlen(str));
	}
	else	
	{
		i = 0;
		while (len-- > 0)
			pf->out += (pf->flag.zero == 1 ? write(1, "0", 1) : write(1, " ", 1));
		pf->out += write(1, str, ft_strlen(str));
	}
}

void str_arg(va_list ap, pf_token *pf, char *str)
{
	char *tmp;

	str = va_arg(ap, char*);
	if (pf->flag.prec >= 0 && pf->flag.prec < (int)ft_strlen(str))
	{
		tmp = ft_strsub(str, 0, pf->flag.prec);
		str = tmp;
	}
	if (str == NULL)
		null_str(pf);
	else if (pf->flag.left == 1)
		left_margin_str(pf, str);
	else
		right_margin_str(pf, str);
}

void percent_arg(pf_token *pf)
{
	if (pf->flag.left == 1)
	{
		pf->out += write(1, "%", 1);
		while (--pf->flag.width > 0)
			pf->out += write(1, " ", 1);
	}
	else
	{
		while (--pf->flag.width > 0)
			pf->out += write(1, " ", 1);
		pf->out += write(1, "%", 1);
	}
}

void ascii_handler(const char *fmt, va_list ap, pf_token *pf)
{
	int ch_tmp;
	char *str_tmp;

	str_tmp = NULL;
	if (fmt[pf->i] == 'c')
		char_arg(ap, pf, &ch_tmp);
	else if (fmt[pf->i] == 's')
		str_arg(ap, pf, str_tmp);
	else if (fmt[pf->i] == '%')
		percent_arg(pf);
}