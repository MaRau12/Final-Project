"""empty message

Revision ID: 6d0c84d564a7
Revises: 94782de0542c
Create Date: 2023-04-21 14:50:23.724772

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6d0c84d564a7'
down_revision = '94782de0542c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('admin',
               existing_type=sa.BOOLEAN(),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('admin',
               existing_type=sa.BOOLEAN(),
               nullable=False)

    # ### end Alembic commands ###