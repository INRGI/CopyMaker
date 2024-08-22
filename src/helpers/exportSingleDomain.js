export function exportSingleDomain(domain) {
    const cleanDomainName = domain.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();

    const dataStr = JSON.stringify(domain, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${cleanDomainName}_domain.json`;
    link.click();
    URL.revokeObjectURL(url);
}
