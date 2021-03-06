"""empty message

Revision ID: 83fa5d65327f
Revises: ecf1b2ee4ebf
Create Date: 2020-12-18 09:56:42.252034

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '83fa5d65327f'
down_revision = 'ecf1b2ee4ebf'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user_menu',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('menu_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['menu_id'], ['menu.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['user_id'], ['cms_user.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('user_id', 'menu_id')
    )
    op.add_column('cms_user', sa.Column('TAG', sa.String(length=20), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('cms_user', 'TAG')
    op.drop_table('user_menu')
    # ### end Alembic commands ###
