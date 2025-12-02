from django.db.models import Q
from rest_framework.filters import SearchFilter


class AccentInsensitiveSearchFilter(SearchFilter):
    """
    Accent-insensitive, case-insensitive search filter using
    Django's built-in Unaccent lookup (PostgreSQL only).
    """

    def filter_queryset(self, request, queryset, view):
        search_terms = self.get_search_terms(request)
        if not search_terms:
            return queryset

        search_fields = self.get_search_fields(view, request)
        if not search_fields:
            return queryset

        query = Q()
        for term in search_terms:
            term_query = Q()
            for field in search_fields:
                term_query |= Q(**{f"{field}__unaccent__icontains": term})
            query &= term_query

        return queryset.filter(query)
