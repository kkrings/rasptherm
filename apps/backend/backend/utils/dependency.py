from collections.abc import Callable, Iterator
from contextlib import contextmanager
from typing import Any, TypeVar

from fastapi import FastAPI

_Dependency = TypeVar("_Dependency", bound=Callable[..., Any])
_DependencyOverride = TypeVar("_DependencyOverride", bound=Callable[..., Any])


@contextmanager
def override_dependency(
    app: FastAPI, dependency: _Dependency, dependency_override: _DependencyOverride
) -> Iterator[None]:
    try:
        app.dependency_overrides[dependency] = dependency_override
        yield
    finally:
        del app.dependency_overrides[dependency]
